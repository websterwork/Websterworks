import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TeamMeetDocument = TeamMeet & Document;

export enum MeetStatus {
  SCHEDULED = 'scheduled',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
}

@Schema({ timestamps: true })
export class TeamMeet {
  @Prop({ required: true })
  title: string;

  @Prop({ type: String, maxlength: 500 })
  description?: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  organizerId: Types.ObjectId;

  @Prop({ type: String, enum: MeetStatus, default: MeetStatus.SCHEDULED })
  status: MeetStatus;

  @Prop({ required: true, type: Date })
  scheduledStartTime: Date;

  @Prop({ type: Date })
  scheduledEndTime?: Date;

  @Prop({ type: Date })
  actualStartTime?: Date;

  @Prop({ type: Date })
  actualEndTime?: Date;

  @Prop({ type: String })
  meetingLink?: string; // Zoom, Google Meet, etc. link

  @Prop({ type: String })
  meetingRoomId?: string; // Internal room ID for video streaming

  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
  participants: Types.ObjectId[];

  @Prop({ type: Number, default: 0 })
  maxParticipants?: number; // 0 = unlimited

  @Prop({ type: Boolean, default: false })
  isRecorded: boolean;

  @Prop({ type: String })
  recordingUrl?: string;

  @Prop({ type: [String] })
  tags?: string[]; // 'standup', 'sprint-planning', 'retrospective', etc.

  @Prop({ type: String })
  category?: string; // 'meeting', 'webinar', 'training', etc.
}

export const TeamMeetSchema = SchemaFactory.createForClass(TeamMeet);
