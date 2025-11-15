import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  senderId: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  recipientId: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Conversation' })
  conversationId: Types.ObjectId;

  @Prop({ required: true })
  content: string;

  @Prop({ type: Boolean, default: false })
  isRead: boolean;

  @Prop({ type: Date, default: null })
  readAt?: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

// Index for efficient querying
MessageSchema.index({ conversationId: 1, createdAt: -1 });
MessageSchema.index({ senderId: 1, recipientId: 1 });
