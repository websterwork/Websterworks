import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BillingProfileDocument = BillingProfile & Document;

export enum SubscriptionStatus {
  ACTIVE = 'active',
  CANCELED = 'canceled',
  PAUSED = 'paused',
  TRIAL = 'trial',
}

export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  PAYPAL = 'paypal',
  BANK_TRANSFER = 'bank_transfer',
}

@Schema({ timestamps: true })
export class BillingProfile {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({
    type: String,
    enum: SubscriptionStatus,
    default: SubscriptionStatus.TRIAL,
  })
  subscriptionStatus: SubscriptionStatus;

  @Prop({ type: String })
  subscriptionPlan?: string; // 'free', 'pro', 'enterprise', etc.

  @Prop({ type: Date })
  subscriptionStartDate?: Date;

  @Prop({ type: Date })
  subscriptionEndDate?: Date;

  @Prop({ type: Number, default: 0 })
  balance: number; // Account balance in cents

  @Prop({ type: String, enum: PaymentMethod })
  defaultPaymentMethod?: PaymentMethod;

  @Prop({ type: String })
  paymentMethodId?: string; // Stripe, PayPal, etc. ID

  @Prop({ type: String })
  cardLastFour?: string; // For card info display

  @Prop({ type: String })
  cardBrand?: string; // Visa, Mastercard, etc.

  @Prop({ type: Boolean, default: false })
  autoRenew: boolean;

  @Prop({ type: Number, default: 0 })
  totalSpent: number; // Total amount spent (in cents)

  @Prop({ type: [String] })
  invoices?: string[]; // Array of invoice IDs
}

export const BillingProfileSchema =
  SchemaFactory.createForClass(BillingProfile);
