import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, FilterQuery } from 'mongoose';
import {
  TeamMeet,
  TeamMeetDocument,
  MeetStatus,
} from './schemas/team-meet.schema';

@Injectable()
export class TeamMeetsService {
  constructor(
    @InjectModel(TeamMeet.name) private teamMeetModel: Model<TeamMeetDocument>,
  ) {}

  // Helper to coerce different participant representations (ObjectId, populated doc, string)
  private idToString(p: unknown): string | undefined {
    if (!p) return undefined;
    if (typeof p === 'string') return p;
    if (typeof p === 'object' && p !== null) {
      const obj = p as { _id?: unknown; toString?: () => string };

      // Prefer string _id values
      if (typeof obj._id === 'string') return obj._id;

      // Helper to detect objects with a usable toString method
      const hasToString = (x: unknown): x is { toString: () => string } =>
        typeof x === 'object' &&
        x !== null &&
        typeof (x as Record<string, unknown>)['toString'] === 'function';

      if (hasToString(obj._id)) return obj._id.toString();
      if (hasToString(obj)) return obj.toString();
    }
    return undefined;
  }

  /**
   * Create a new team meeting
   */
  async create(
    organizerId: string,
    title: string,
    description?: string,
    scheduledStartTime?: Date,
    scheduledEndTime?: Date,
    maxParticipants?: number,
  ) {
    if (!title || title.trim().length === 0) {
      throw new BadRequestException('Meeting title is required');
    }

    if (!scheduledStartTime || scheduledStartTime <= new Date()) {
      throw new BadRequestException('Meeting start time must be in the future');
    }

    const meet = new this.teamMeetModel({
      organizerId: new Types.ObjectId(organizerId),
      title: title.trim(),
      description: description?.trim(),
      scheduledStartTime,
      scheduledEndTime,
      maxParticipants: maxParticipants || 0,
      participants: [new Types.ObjectId(organizerId)],
      status: MeetStatus.SCHEDULED,
    });

    return meet.save();
  }

  /**
   * Get all team meetings (upcoming and past)
   */
  async getAll(userId?: string) {
    const filter: FilterQuery<TeamMeetDocument> = {};

    if (userId) {
      filter.$or = [
        { organizerId: new Types.ObjectId(userId) },
        { participants: new Types.ObjectId(userId) },
      ];
    }

    return this.teamMeetModel
      .find(filter)
      .populate('organizerId', 'email username')
      .sort({ scheduledStartTime: -1 })
      .exec();
  }

  /**
   * Get a specific team meeting
   */
  async getById(meetId: string) {
    const meet = await this.teamMeetModel
      .findById(meetId)
      .populate('organizerId', 'email username')
      .populate('participants', 'email username');

    if (!meet) {
      throw new NotFoundException('Meeting not found');
    }

    return meet;
  }

  /**
   * Join a team meeting
   */
  async joinMeeting(meetId: string, userId: string) {
    const meet = await this.getById(meetId);

    // Check if already a participant (supports populated docs or ObjectId values)
    const isParticipant = meet.participants.some((p: unknown) => {
      const pid = this.idToString(p);
      return pid === userId;
    });
    if (isParticipant) {
      throw new BadRequestException('Already a participant in this meeting');
    }

    // Check max participants (use nullish coalescing to handle undefined)
    const max = meet.maxParticipants ?? 0;
    if (max > 0 && meet.participants.length >= max) {
      throw new BadRequestException('Meeting is at maximum capacity');
    }

    meet.participants.push(new Types.ObjectId(userId));
    return meet.save();
  }

  /**
   * Leave a team meeting
   */
  async leaveMeeting(meetId: string, userId: string) {
    const meet = await this.getById(meetId);

    if (meet.organizerId.toString() === userId) {
      throw new BadRequestException('Organizer cannot leave the meeting');
    }

    meet.participants = meet.participants.filter((p: unknown) => {
      const pid = this.idToString(p);
      return pid !== userId;
    });
    return meet.save();
  }

  /**
   * Update meeting status
   */
  async updateStatus(meetId: string, userId: string, status: MeetStatus) {
    const meet = await this.getById(meetId);

    if (meet.organizerId.toString() !== userId) {
      throw new ForbiddenException('Only organizer can update meeting status');
    }

    meet.status = status;

    if (status === MeetStatus.ACTIVE) {
      meet.actualStartTime = new Date();
    }

    if (status === MeetStatus.COMPLETED) {
      meet.actualEndTime = new Date();
    }

    return meet.save();
  }

  /**
   * Get upcoming meetings
   */
  async getUpcomingMeetings(userId: string) {
    return this.teamMeetModel
      .find({
        $or: [
          { organizerId: new Types.ObjectId(userId) },
          { participants: new Types.ObjectId(userId) },
        ],
        status: { $in: [MeetStatus.SCHEDULED, MeetStatus.ACTIVE] },
        scheduledStartTime: { $gte: new Date() },
      })
      .populate('organizerId', 'email username')
      .sort({ scheduledStartTime: 1 })
      .exec();
  }

  /**
   * Get meeting statistics
   */
  async getMeetingStats(userId: string) {
    const meets = await this.teamMeetModel.find({
      $or: [
        { organizerId: new Types.ObjectId(userId) },
        { participants: new Types.ObjectId(userId) },
      ],
    });

    return {
      totalMeetings: meets.length,
      organized: meets.filter((m) => m.organizerId.toString() === userId)
        .length,
      participated: meets.filter((m) =>
        m.participants.some((p: unknown) => this.idToString(p) === userId),
      ).length,
      completed: meets.filter((m) => m.status === MeetStatus.COMPLETED).length,
      scheduled: meets.filter((m) => m.status === MeetStatus.SCHEDULED).length,
    };
  }

  /**
   * Delete/cancel a meeting
   */
  async cancelMeeting(meetId: string, userId: string) {
    const meet = await this.getById(meetId);

    if (meet.organizerId.toString() !== userId) {
      throw new ForbiddenException('Only organizer can cancel the meeting');
    }

    meet.status = MeetStatus.CANCELED;
    return meet.save();
  }
}
