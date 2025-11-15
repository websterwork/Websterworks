import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserStatus, UserStatusSchema } from './schemas/user-status.schema';
import { UserSecurity, UserSecuritySchema } from './schemas/security.schema';
import { UserConsent, UserConsentSchema } from './schemas/consent.schema';
import { BillingProfile, BillingProfileSchema } from './schemas/billing.schema';
import { ProjectsModule } from '../projects/projects.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserStatus.name, schema: UserStatusSchema },
      { name: UserSecurity.name, schema: UserSecuritySchema },
      { name: UserConsent.name, schema: UserConsentSchema },
      { name: BillingProfile.name, schema: BillingProfileSchema },
    ]),
    ProjectsModule,
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
