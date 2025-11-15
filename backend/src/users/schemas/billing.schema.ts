import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BillingProfileDocument = BillingProfile & Document;

@Schema({ timestamps: true })
export class BillingProfile {
  @Prop({ type: String, default: null })
  paymentProvider?: string; // e.g., "Stripe", "PayPal"

  @Prop({ type: String, default: null })
  customerId?: string; // External service customer ID

  @Prop({ type: Boolean, default: false })
  hasActiveSubscription?: boolean;

  @Prop({ type: Number, default: 0 })
  creditsAvailable?: number;
}

export const BillingProfileSchema =
  SchemaFactory.createForClass(BillingProfile);
