import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { GetCurrentUser } from '../common/decorators/get-current-user.decorator';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  /**
   * Get all conversations for the authenticated user
   */
  @UseGuards(JwtAuthGuard)
  @Get('conversations')
  async getConversations(@GetCurrentUser('userId') userId: string) {
    return this.messagesService.getConversations(userId);
  }

  /**
   * Get messages in a specific conversation
   */
  @UseGuards(JwtAuthGuard)
  @Get('conversations/:conversationId/messages')
  async getConversationMessages(
    @GetCurrentUser('userId') userId: string,
    @Param('conversationId') conversationId: string,
    @Query('limit') limit?: string,
    @Query('skip') skip?: string,
  ) {
    return this.messagesService.getConversationMessages(
      conversationId,
      userId,
      limit ? parseInt(limit) : 50,
      skip ? parseInt(skip) : 0,
    );
  }

  /**
   * Send a message
   */
  @UseGuards(JwtAuthGuard)
  @Post('send')
  async sendMessage(
    @GetCurrentUser('userId') userId: string,
    @Body() body: { recipientId: string; content: string },
  ) {
    return this.messagesService.sendMessage(
      userId,
      body.recipientId,
      body.content,
    );
  }

  /**
   * Mark a single message as read
   */
  @UseGuards(JwtAuthGuard)
  @Patch(':messageId/read')
  async markAsRead(
    @GetCurrentUser('userId') userId: string,
    @Param('messageId') messageId: string,
  ) {
    return this.messagesService.markAsRead(messageId, userId);
  }

  /**
   * Mark all messages in a conversation as read
   */
  @UseGuards(JwtAuthGuard)
  @Patch('conversations/:conversationId/read')
  async markConversationAsRead(
    @GetCurrentUser('userId') userId: string,
    @Param('conversationId') conversationId: string,
  ) {
    return this.messagesService.markConversationAsRead(conversationId, userId);
  }

  /**
   * Get unread message count
   */
  @UseGuards(JwtAuthGuard)
  @Get('unread/count')
  async getUnreadCount(@GetCurrentUser('userId') userId: string) {
    return this.messagesService.getUnreadCount(userId);
  }
}
