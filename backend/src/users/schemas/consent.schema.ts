import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserConsentDocument = UserConsent & Document;

@Schema({ timestamps: true })
export class UserConsent {
  @Prop({ type: Boolean, default: false })
  acceptedTerms: boolean;

  @Prop({ type: Boolean, default: false })
  acceptedPrivacyPolicy: boolean;

  @Prop({ type: Boolean, default: false })
  acceptedMarketingEmails: boolean;

  @Prop({ type: Date, default: null })
  lastUpdated?: Date;
}

export const UserConsentSchema = SchemaFactory.createForClass(UserConsent);
