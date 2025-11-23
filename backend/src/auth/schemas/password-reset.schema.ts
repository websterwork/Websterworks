import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PasswordResetDocument = PasswordReset & Document;

@Schema({ timestamps: true })
export class PasswordReset {
  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ required: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true })
  tokenHash: string;

  @Prop({ type: Date, required: true })
  expiresAt: Date;

  @Prop({ type: Number, default: 0 })
  attempts: number;
}

export const PasswordResetSchema = SchemaFactory.createForClass(PasswordReset);
// TTL index - document removed after expiresAt
PasswordResetSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
