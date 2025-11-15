import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProjectDocument = Project & Document;

export enum ProjectStatus {
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
  PENDING = 'pending',
  DISCARDED = 'discarded',
}

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true })
  title: string;

  @Prop({ type: String, maxlength: 500 })
  description?: string;

  @Prop({
    required: true,
    type: String,
    enum: ProjectStatus,
    default: ProjectStatus.PENDING,
  })
  status: ProjectStatus;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ type: Date })
  startDate?: Date;

  @Prop({ type: Date })
  endDate?: Date;

  @Prop({ type: Date })
  completedAt?: Date;

  @Prop({ type: String, maxlength: 100 })
  category?: string;

  @Prop({ type: Number, default: 0, min: 0, max: 100 })
  progress?: number;

  @Prop({ type: [String] })
  tags?: string[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
