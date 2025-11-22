import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmailVerificationDocument = EmailVerification & Document;

@Schema({ timestamps: true })
export class EmailVerification {
  @Prop({ required: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true, trim: true })
  username: string;

  // bcrypt-hashed password (we store this temporarily until verification completes)
  @Prop({ required: true })
  hashedPassword: string;

  // bcrypt-hashed verification code
  @Prop({ required: true })
  codeHash: string;

  @Prop({ required: true })
  expiresAt: Date;

  @Prop({ default: 0 })
  attempts: number;
}

export const EmailVerificationSchema =
  SchemaFactory.createForClass(EmailVerification);

// Index to remove expired verification docs automatically (TTL)
EmailVerificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
