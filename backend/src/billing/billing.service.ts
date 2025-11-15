import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  BillingProfile,
  BillingProfileDocument,
  PaymentMethod,
  SubscriptionStatus,
} from './schemas/billing-profile.schema';

@Injectable()
export class BillingService {
  constructor(
    @InjectModel(BillingProfile.name)
    private billingModel: Model<BillingProfileDocument>,
  ) {}

  /**
   * Get or create billing profile for a user
   */
  async getOrCreateBillingProfile(userId: string) {
    let profile = await this.billingModel.findOne({
      userId: new Types.ObjectId(userId),
    });

    if (!profile) {
      profile = new this.billingModel({
        userId: new Types.ObjectId(userId),
        balance: 0,
        totalSpent: 0,
      });
      await profile.save();
    }

    return profile;
  }

  /**
   * Get billing profile for user
   */
  async getBillingProfile(userId: string) {
    const profile = await this.getOrCreateBillingProfile(userId);
    return profile;
  }

  /**
   * Update payment method
   */
  async updatePaymentMethod(
    userId: string,
    paymentMethod: string,
    cardLastFour?: string,
    cardBrand?: string,
  ) {
    const profile = await this.getOrCreateBillingProfile(userId);

    // Validate payment method against known values
    if (Object.values(PaymentMethod).includes(paymentMethod as PaymentMethod)) {
      profile.defaultPaymentMethod = paymentMethod as PaymentMethod;
    } else {
      // Unknown payment method - clear stored method
      profile.defaultPaymentMethod = undefined;
    }
    profile.cardLastFour = cardLastFour;
    profile.cardBrand = cardBrand;
    profile.paymentMethodId = `${paymentMethod}_${Date.now()}`;

    return profile.save();
  }

  /**
   * Update subscription
   */
  async updateSubscription(userId: string, plan: string, status: string) {
    const profile = await this.getOrCreateBillingProfile(userId);

    profile.subscriptionPlan = plan;
    // Only set a valid subscription status
    if (
      Object.values(SubscriptionStatus).includes(status as SubscriptionStatus)
    ) {
      profile.subscriptionStatus = status as SubscriptionStatus;
    } else {
      profile.subscriptionStatus = SubscriptionStatus.TRIAL;
    }
    profile.subscriptionStartDate = new Date();

    return profile.save();
  }

  /**
   * Add balance to account
   */
  async addBalance(userId: string, amount: number) {
    if (amount <= 0) {
      throw new BadRequestException('Amount must be greater than 0');
    }

    const profile = await this.getOrCreateBillingProfile(userId);
    profile.balance += amount;
    profile.totalSpent += amount;

    return profile.save();
  }

  /**
   * Deduct balance from account
   */
  async deductBalance(userId: string, amount: number) {
    if (amount <= 0) {
      throw new BadRequestException('Amount must be greater than 0');
    }

    const profile = await this.getOrCreateBillingProfile(userId);

    if (profile.balance < amount) {
      throw new BadRequestException('Insufficient balance');
    }

    profile.balance -= amount;

    return profile.save();
  }

  /**
   * Get billing history/invoices
   */
  async getBillingHistory(userId: string) {
    const profile = await this.getOrCreateBillingProfile(userId);
    return {
      totalSpent: profile.totalSpent,
      currentBalance: profile.balance,
      subscriptionStatus: profile.subscriptionStatus,
      subscriptionPlan: profile.subscriptionPlan,
      invoices: profile.invoices || [],
    };
  }
}
