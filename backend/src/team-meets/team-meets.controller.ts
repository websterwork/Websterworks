import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { TeamMeetsService } from './team-meets.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { GetCurrentUser } from '../common/decorators/get-current-user.decorator';
import { MeetStatus } from './schemas/team-meet.schema';

@Controller('team-meets')
export class TeamMeetsController {
  constructor(private teamMeetsService: TeamMeetsService) {}

  /**
   * Create a new team meeting
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @GetCurrentUser('userId') userId: string,
    @Body()
    body: {
      title: string;
      description?: string;
      scheduledStartTime: Date;
      scheduledEndTime?: Date;
      maxParticipants?: number;
    },
  ) {
    return this.teamMeetsService.create(
      userId,
      body.title,
      body.description,
      new Date(body.scheduledStartTime),
      body.scheduledEndTime ? new Date(body.scheduledEndTime) : undefined,
      body.maxParticipants,
    );
  }

  /**
   * Get all team meetings for the user
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@GetCurrentUser('userId') userId: string) {
    return this.teamMeetsService.getAll(userId);
  }

  /**
   * Get upcoming meetings
   */
  @UseGuards(JwtAuthGuard)
  @Get('upcoming')
  async getUpcoming(@GetCurrentUser('userId') userId: string) {
    return this.teamMeetsService.getUpcomingMeetings(userId);
  }

  /**
   * Get meeting statistics
   */
  @UseGuards(JwtAuthGuard)
  @Get('stats')
  async getStats(@GetCurrentUser('userId') userId: string) {
    return this.teamMeetsService.getMeetingStats(userId);
  }

  /**
   * Get a specific meeting
   */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id') meetId: string) {
    return this.teamMeetsService.getById(meetId);
  }

  /**
   * Join a meeting
   */
  @UseGuards(JwtAuthGuard)
  @Patch(':id/join')
  async joinMeeting(
    @GetCurrentUser('userId') userId: string,
    @Param('id') meetId: string,
  ) {
    return this.teamMeetsService.joinMeeting(meetId, userId);
  }

  /**
   * Leave a meeting
   */
  @UseGuards(JwtAuthGuard)
  @Patch(':id/leave')
  async leaveMeeting(
    @GetCurrentUser('userId') userId: string,
    @Param('id') meetId: string,
  ) {
    return this.teamMeetsService.leaveMeeting(meetId, userId);
  }

  /**
   * Update meeting status
   */
  @UseGuards(JwtAuthGuard)
  @Patch(':id/status')
  async updateStatus(
    @GetCurrentUser('userId') userId: string,
    @Param('id') meetId: string,
    @Body() body: { status: MeetStatus },
  ) {
    return this.teamMeetsService.updateStatus(meetId, userId, body.status);
  }

  /**
   * Cancel a meeting
   */
  @UseGuards(JwtAuthGuard)
  @Patch(':id/cancel')
  async cancelMeeting(
    @GetCurrentUser('userId') userId: string,
    @Param('id') meetId: string,
  ) {
    return this.teamMeetsService.cancelMeeting(meetId, userId);
  }
}
