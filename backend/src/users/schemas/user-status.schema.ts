import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserStatusDocument = UserStatus & Document;

@Schema({ timestamps: true })
export class UserStatus {
  @Prop({
    type: String,
    enum: ['active', 'inactive', 'banned', 'suspended'],
    default: 'active',
  })
  accountState: string;

  @Prop({ type: Boolean, default: false })
  verifiedEmail: boolean;

  @Prop({ type: Boolean, default: false })
  verifiedIdentity: boolean;

  @Prop({ type: Date, default: null })
  lastLogin?: Date;

  @Prop({ type: Date, default: null })
  lastActive?: Date;
}

export const UserStatusSchema = SchemaFactory.createForClass(UserStatus);
