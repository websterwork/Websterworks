import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ConversationDocument = Conversation & Document;

@Schema({ timestamps: true })
export class Conversation {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  participant1: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  participant2: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Message', default: null })
  lastMessage?: Types.ObjectId;

  @Prop({ type: Date, default: null })
  lastMessageAt?: Date;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);

// Index for efficient querying
ConversationSchema.index(
  { participant1: 1, participant2: 1 },
  { unique: true, sparse: true },
);
