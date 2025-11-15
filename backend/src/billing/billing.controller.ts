import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { BillingService } from './billing.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { GetCurrentUser } from '../common/decorators/get-current-user.decorator';

@Controller('billing')
export class BillingController {
  constructor(private billingService: BillingService) {}

  /**
   * Get user billing profile
   */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getBillingProfile(@GetCurrentUser('userId') userId: string) {
    return this.billingService.getBillingProfile(userId);
  }

  /**
   * Update payment method
   */
  @UseGuards(JwtAuthGuard)
  @Post('payment-method')
  async updatePaymentMethod(
    @GetCurrentUser('userId') userId: string,
    @Body()
    body: {
      paymentMethod: string;
      cardLastFour?: string;
      cardBrand?: string;
    },
  ) {
    return this.billingService.updatePaymentMethod(
      userId,
      body.paymentMethod,
      body.cardLastFour,
      body.cardBrand,
    );
  }

  /**
   * Update subscription
   */
  @UseGuards(JwtAuthGuard)
  @Post('subscription')
  async updateSubscription(
    @GetCurrentUser('userId') userId: string,
    @Body() body: { plan: string; status: string },
  ) {
    return this.billingService.updateSubscription(
      userId,
      body.plan,
      body.status,
    );
  }

  /**
   * Add balance
   */
  @UseGuards(JwtAuthGuard)
  @Post('add-balance')
  async addBalance(
    @GetCurrentUser('userId') userId: string,
    @Body() body: { amount: number },
  ) {
    return this.billingService.addBalance(userId, body.amount);
  }

  /**
   * Get billing history
   */
  @UseGuards(JwtAuthGuard)
  @Get('history')
  async getBillingHistory(@GetCurrentUser('userId') userId: string) {
    return this.billingService.getBillingHistory(userId);
  }
}
