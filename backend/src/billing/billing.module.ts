import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import {
  BillingProfile,
  BillingProfileSchema,
} from './schemas/billing-profile.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BillingProfile.name, schema: BillingProfileSchema },
    ]),
  ],
  controllers: [BillingController],
  providers: [BillingService],
  exports: [BillingService],
})
export class BillingModule {}
