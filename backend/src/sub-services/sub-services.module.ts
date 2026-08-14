import { Module } from '@nestjs/common';
import { SubServicesController } from './sub-services.controller';
import { SubServicesService } from './sub-services.service';

@Module({
  controllers: [SubServicesController],
  providers: [SubServicesService]
})
export class SubServicesModule {}
