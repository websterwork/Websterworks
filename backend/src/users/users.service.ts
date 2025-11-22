import { Injectable, BadRequestException } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import validator from 'validator';
import { ProjectsService } from '../projects/projects.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private projectsService: ProjectsService,
  ) {}

  async create(username: string, email: string, password: string) {
    if (typeof email !== 'string' || !validator.isEmail(email))
      throw new BadRequestException('Invalid email');
    if (typeof password !== 'string' || password.length < 6)
      throw new BadRequestException('Invalid password');
    if (typeof username !== 'string' || username.trim().length === 0)
      throw new BadRequestException('Invalid username');
    const normalized = validator.normalizeEmail(email);
    const existing = await this.userModel
      .findOne({ email: normalized })
      .lean()
      .exec();
    if (existing) throw new BadRequestException('Email already exists');

    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 12;
    const hashed = await bcrypt.hash(password, saltRounds);

    const user = new this.userModel({
      username: username,
      email: normalized,
      password: hashed,
    });
    try {
      return await user.save();
    } catch (err) {
      // Translate Mongo duplicate key errors into a friendly HTTP response
      const mongoErr = err as
        | { code?: number; keyValue?: Record<string, unknown> }
        | undefined;
      if (mongoErr?.code === 11000) {
        // Determine which field caused the duplicate key (if available)
        let dupField = 'field';
        if (mongoErr.keyValue) dupField = Object.keys(mongoErr.keyValue)[0];
        throw new BadRequestException(`${dupField} already exists`);
      }
      throw err;
    }
  }

  async findByEmail(email: string) {
    if (typeof email !== 'string' || !validator.isEmail(email)) return null;
    const normalized = validator.normalizeEmail(email);
    return this.userModel.findOne({ email: normalized }).exec();
  }
  async findByUsername(username: string) {
    return this.userModel.findOne({ username: username }).exec();
  }
  async findById(id: string) {
    return this.userModel.findById(id).exec();
  }

  /** Return a public view of the user without sensitive fields */
  async findPublicById(id: string) {
    const user = await this.userModel
      .findById(id)
      .select('-password -currentHashedRefreshToken')
      .lean()
      .exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async setCurrentRefreshToken(hashedToken: string, userId: string) {
    await this.userModel
      .findByIdAndUpdate(
        userId,
        { currentHashedRefreshToken: hashedToken },
        { new: true },
      )
      .exec();
  }

  async removeRefreshToken(userId: string) {
    await this.userModel
      .findByIdAndUpdate(userId, { currentHashedRefreshToken: null })
      .exec();
  }

  /**
   * Get user profile with project statistics overview
   */
  async getProfileWithStats(userId: string) {
    const user = await this.findPublicById(userId);
    if (!user) throw new NotFoundException('User not found');

    // Get project stats
    const stats = await this.projectsService.getStatsByUserId(userId);

    return {
      ...user,
      projectStats: stats,
    };
  }
}
