import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserStatus } from './user-status.schema';
import { UserSecurity } from './security.schema';
import { UserConsent } from './consent.schema';
import { BillingProfile } from './billing.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true })
  password: string;

  // Keep username unique via an explicit partial index below (avoids unique-null issues).
  @Prop({ trim: true })
  username: string;

  @Prop({ type: Number, min: 13, max: 100 })
  age?: number;

  @Prop({ type: String, maxlength: 300 })
  bio?: string;

  @Prop({ type: String, maxlength: 100 })
  about?: string;

  // Role: 'client', 'freelancer', 'admin'
  @Prop({
    type: String,
    enum: ['client', 'freelancer', 'admin'],
    default: 'client',
  })
  roles: string;

  // Link to other sub-documents
  @Prop({ type: Types.ObjectId, ref: 'UserStatus' })
  status: UserStatus;

  @Prop({ type: Types.ObjectId, ref: 'UserSecurity' })
  security: UserSecurity;

  @Prop({ type: Types.ObjectId, ref: 'UserConsent' })
  consents: UserConsent;

  @Prop({ type: Types.ObjectId, ref: 'BillingProfile' })
  billing: BillingProfile;

  @Prop({ type: String, default: null })
  currentHashedRefreshToken?: string | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index(
  { username: 1 },
  { unique: true, partialFilterExpression: { username: { $type: 'string' } } },
);
