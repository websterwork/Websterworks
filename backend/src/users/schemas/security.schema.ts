import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserSecurityDocument = UserSecurity & Document;

@Schema({ timestamps: true })
export class UserSecurity {
  @Prop({ type: Boolean, default: false })
  twoFactorEnabled: boolean;

  @Prop({ type: String, default: null })
  twoFactorSecret?: string;

  @Prop({ type: Boolean, default: true })
  emailAlertsEnabled: boolean;

  @Prop({ type: Boolean, default: true })
  loginNotifications: boolean;

  @Prop({ type: Number, default: 5 })
  maxLoginAttempts: number;

  @Prop({ type: Date, default: null })
  lockUntil?: Date;
}

export const UserSecuritySchema = SchemaFactory.createForClass(UserSecurity);
