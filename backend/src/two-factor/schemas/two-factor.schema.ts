import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TwoFactorDocument = TwoFactor & Document;

@Schema({ timestamps: true })
export class TwoFactor {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ type: Boolean, default: false })
  isEnabled: boolean;

  @Prop({ type: String })
  secret?: string; // TOTP secret for authenticator app

  @Prop({ type: String })
  qrCode?: string; // QR code data URL

  @Prop({ type: [String] })
  backupCodes?: string[]; // Recovery codes

  @Prop({ type: String })
  method?: string; // 'totp' (Google Authenticator) or 'sms'

  @Prop({ type: String })
  phoneNumber?: string; // For SMS 2FA

  @Prop({ type: Date })
  enabledAt?: Date;

  @Prop({ type: Date })
  disabledAt?: Date;

  @Prop({ type: Boolean, default: false })
  isVerified: boolean; // Verified via backup code or test
}

export const TwoFactorSchema = SchemaFactory.createForClass(TwoFactor);
