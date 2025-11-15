import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TwoFactorController } from './two-factor.controller';
import { TwoFactorService } from './two-factor.service';
import { TwoFactor, TwoFactorSchema } from './schemas/two-factor.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TwoFactor.name, schema: TwoFactorSchema },
    ]),
    UsersModule,
  ],
  controllers: [TwoFactorController],
  providers: [TwoFactorService],
  exports: [TwoFactorService],
})
export class TwoFactorModule {}
