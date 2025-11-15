import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  Project,
  ProjectStatus,
  ProjectDocument,
} from './schemas/project.schema';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  /** Create a new project */
  async create(
    userId: string,
    title: string,
    description?: string,
    status: ProjectStatus = ProjectStatus.PENDING,
  ) {
    if (!title || title.trim().length === 0) {
      throw new BadRequestException('Project title is required');
    }

    const project = new this.projectModel({
      title: title.trim(),
      description: description?.trim(),
      status,
      userId: new Types.ObjectId(userId),
      startDate: new Date(),
    });

    return project.save();
  }

  /** Get all projects for a user */
  async findByUserId(userId: string) {
    return this.projectModel
      .find({ userId: new Types.ObjectId(userId) })
      .sort({ createdAt: -1 })
      .exec();
  }

  /** Get project statistics for a user (counts by status) */
  async getStatsByUserId(userId: string) {
    const stats = await this.projectModel
      .aggregate([
        { $match: { userId: new Types.ObjectId(userId) } },
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
          },
        },
      ])
      .exec();

    // Format stats with all status types, defaulting to 0 if not present
    const formattedStats = {
      ongoing: 0,
      completed: 0,
      pending: 0,
      discarded: 0,
    };

    (stats as Array<{ _id: string; count: number }>).forEach((stat) => {
      const k = stat._id as keyof typeof formattedStats;
      if (k in formattedStats) {
        formattedStats[k] = stat.count;
      }
    });

    return formattedStats;
  }

  /** Get a single project by id */
  async findById(projectId: string) {
    const project = await this.projectModel.findById(projectId).exec();
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  /** Update project status */
  async updateStatus(projectId: string, userId: string, status: ProjectStatus) {
    const project = await this.findById(projectId);

    if (project.userId.toString() !== userId) {
      throw new BadRequestException('Not authorized to update this project');
    }

    if (status === ProjectStatus.COMPLETED) {
      project.completedAt = new Date();
    }

    project.status = status;
    return project.save();
  }

  /** Update project progress */
  async updateProgress(projectId: string, userId: string, progress: number) {
    const project = await this.findById(projectId);

    if (project.userId.toString() !== userId) {
      throw new BadRequestException('Not authorized to update this project');
    }

    if (progress < 0 || progress > 100) {
      throw new BadRequestException('Progress must be between 0 and 100');
    }

    project.progress = progress;
    return project.save();
  }

  /** Delete a project */
  async delete(projectId: string, userId: string) {
    const project = await this.findById(projectId);

    if (project.userId.toString() !== userId) {
      throw new BadRequestException('Not authorized to delete this project');
    }

    return this.projectModel.findByIdAndDelete(projectId).exec();
  }
}
