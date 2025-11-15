import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { GetCurrentUser } from '../common/decorators/get-current-user.decorator';
import { ProjectStatus } from './schemas/project.schema';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @GetCurrentUser('userId') userId: string,
    @Body()
    body: { title: string; description?: string; status?: ProjectStatus },
  ) {
    return this.projectsService.create(
      userId,
      body.title,
      body.description,
      body.status,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@GetCurrentUser('userId') userId: string) {
    return this.projectsService.findByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('stats')
  async getStats(@GetCurrentUser('userId') userId: string) {
    return this.projectsService.getStatsByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') projectId: string) {
    return this.projectsService.findById(projectId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/status')
  async updateStatus(
    @GetCurrentUser('userId') userId: string,
    @Param('id') projectId: string,
    @Body() body: { status: ProjectStatus },
  ) {
    return this.projectsService.updateStatus(projectId, userId, body.status);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/progress')
  async updateProgress(
    @GetCurrentUser('userId') userId: string,
    @Param('id') projectId: string,
    @Body() body: { progress: number },
  ) {
    return this.projectsService.updateProgress(
      projectId,
      userId,
      body.progress,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(
    @GetCurrentUser('userId') userId: string,
    @Param('id') projectId: string,
  ) {
    return this.projectsService.delete(projectId, userId);
  }
}
