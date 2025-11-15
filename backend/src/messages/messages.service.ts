import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Message, MessageDocument } from './schemas/message.schema';
import {
  Conversation,
  ConversationDocument,
} from './schemas/conversation.schema';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    @InjectModel(Conversation.name)
    private conversationModel: Model<ConversationDocument>,
  ) {}

  /**
   * Get or create a conversation between two users
   */
  async getOrCreateConversation(userId: string, otherUserId: string) {
    if (userId === otherUserId) {
      throw new BadRequestException('Cannot create conversation with yourself');
    }

    const userObjectId = new Types.ObjectId(userId);
    const otherUserObjectId = new Types.ObjectId(otherUserId);

    // Try to find existing conversation
    let conversation = await this.conversationModel.findOne({
      $or: [
        { participant1: userObjectId, participant2: otherUserObjectId },
        { participant1: otherUserObjectId, participant2: userObjectId },
      ],
    });

    // Create new conversation if it doesn't exist
    if (!conversation) {
      conversation = new this.conversationModel({
        participant1: userObjectId,
        participant2: otherUserObjectId,
      });
      await conversation.save();
    }

    return conversation;
  }

  /**
   * Send a message
   */
  async sendMessage(senderId: string, recipientId: string, content: string) {
    if (!content || content.trim().length === 0) {
      throw new BadRequestException('Message content cannot be empty');
    }

    const conversation = await this.getOrCreateConversation(
      senderId,
      recipientId,
    );

    const message = new this.messageModel({
      senderId: new Types.ObjectId(senderId),
      recipientId: new Types.ObjectId(recipientId),
      conversationId: conversation._id,
      content: content.trim(),
    });

    const savedMessage = await message.save();

    // Update conversation's last message
    await this.conversationModel.findByIdAndUpdate(conversation._id, {
      lastMessage: savedMessage._id,
      lastMessageAt: new Date(),
    });

    return savedMessage.populate(['senderId', 'recipientId']);
  }

  /**
   * Get all conversations for a user
   */
  async getConversations(userId: string) {
    const userObjectId = new Types.ObjectId(userId);

    const conversations = await this.conversationModel
      .find({
        $or: [{ participant1: userObjectId }, { participant2: userObjectId }],
      })
      .populate(['participant1', 'participant2', 'lastMessage'])
      .sort({ lastMessageAt: -1, createdAt: -1 })
      .exec();

    return conversations;
  }

  /**
   * Get messages in a conversation
   */
  async getConversationMessages(
    conversationId: string,
    userId: string,
    limit = 50,
    skip = 0,
  ) {
    const conversation = await this.conversationModel.findById(conversationId);

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    // Verify user is part of the conversation
    if (
      conversation.participant1.toString() !== userId &&
      conversation.participant2.toString() !== userId
    ) {
      throw new ForbiddenException('You are not part of this conversation');
    }

    const messages = await this.messageModel
      .find({ conversationId: new Types.ObjectId(conversationId) })
      .populate(['senderId', 'recipientId'])
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .exec();

    return messages.reverse(); // Return in chronological order
  }

  /**
   * Mark message as read
   */
  async markAsRead(messageId: string, userId: string) {
    const message = await this.messageModel.findById(messageId);

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    if (message.recipientId.toString() !== userId) {
      throw new ForbiddenException('Cannot mark message as read');
    }

    message.isRead = true;
    message.readAt = new Date();

    return message.save();
  }

  /**
   * Mark all messages in a conversation as read
   */
  async markConversationAsRead(conversationId: string, userId: string) {
    const conversation = await this.conversationModel.findById(conversationId);

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    // Verify user is part of the conversation
    if (
      conversation.participant1.toString() !== userId &&
      conversation.participant2.toString() !== userId
    ) {
      throw new ForbiddenException('You are not part of this conversation');
    }

    const result = await this.messageModel.updateMany(
      {
        conversationId: new Types.ObjectId(conversationId),
        recipientId: new Types.ObjectId(userId),
        isRead: false,
      },
      { isRead: true, readAt: new Date() },
    );

    return result;
  }

  /**
   * Get unread message count for a user
   */
  async getUnreadCount(userId: string) {
    const count = await this.messageModel.countDocuments({
      recipientId: new Types.ObjectId(userId),
      isRead: false,
    });

    return { unreadCount: count };
  }
}
