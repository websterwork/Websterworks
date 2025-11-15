import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamMeetsController } from './team-meets.controller';
import { TeamMeetsService } from './team-meets.service';
import { TeamMeet, TeamMeetSchema } from './schemas/team-meet.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TeamMeet.name, schema: TeamMeetSchema },
    ]),
  ],
  controllers: [TeamMeetsController],
  providers: [TeamMeetsService],
  exports: [TeamMeetsService],
})
export class TeamMeetsModule {}
