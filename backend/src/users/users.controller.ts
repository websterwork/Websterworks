import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ParseObjectIdPipe } from '../common/pipes/parse-objectid.pipe';
import { GetCurrentUser } from '../common/decorators/get-current-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@GetCurrentUser('userId') userId: string) {
    return this.usersService.getProfileWithStats(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.usersService.findById(id);
  }
}
