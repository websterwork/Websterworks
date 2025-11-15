import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { TwoFactorService } from './two-factor.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { GetCurrentUser } from '../common/decorators/get-current-user.decorator';
import { UsersService } from '../users/users.service';

@Controller('auth/2fa')
export class TwoFactorController {
  constructor(
    private twoFactorService: TwoFactorService,
    private usersService: UsersService,
  ) {}

  /**
   * Setup 2FA - get secret and QR code
   */
  @UseGuards(JwtAuthGuard)
  @Post('setup')
  async setup(@GetCurrentUser('userId') userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    return this.twoFactorService.generateSetup(userId, user.email);
  }

  /**
   * Enable 2FA with verification token
   */
  @UseGuards(JwtAuthGuard)
  @Post('enable')
  async enable(
    @GetCurrentUser('userId') userId: string,
    @Body() body: { token: string },
  ) {
    return this.twoFactorService.verifyAndEnable(userId, body.token);
  }

  /**
   * Verify 2FA token during login
   */
  @Post('verify')
  async verify(@Body() body: { userId: string; token: string }) {
    return this.twoFactorService.verifyLogin(body.userId, body.token);
  }

  /**
   * Disable 2FA
   */
  @UseGuards(JwtAuthGuard)
  @Post('disable')
  async disable(@GetCurrentUser('userId') userId: string) {
    return this.twoFactorService.disable(userId);
  }

  /**
   * Get 2FA status
   */
  @UseGuards(JwtAuthGuard)
  @Get('status')
  async getStatus(@GetCurrentUser('userId') userId: string) {
    return this.twoFactorService.getStatus(userId);
  }

  /**
   * Get backup codes
   */
  @UseGuards(JwtAuthGuard)
  @Get('backup-codes')
  async getBackupCodes(@GetCurrentUser('userId') userId: string) {
    return this.twoFactorService.getBackupCodes(userId);
  }
}
