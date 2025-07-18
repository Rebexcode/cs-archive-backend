import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role, Roles } from 'src/auth/decorators/roles.decorators';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { SupervisorsService } from './service/supervisors.service';
import { AssignTaskDto, ReviewTaskDto } from './dto/review-task.dto';
import { NotificationsService } from 'src/notifications/notifications.service';

@ApiTags('Supervisors')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Controller('supervisors')
export class SupervisorsController {
  constructor(
    private readonly supervisorsService: SupervisorsService,
    private readonly notificationsService: NotificationsService,
  ) {}

  @Roles(Role.Supervisor)
  @Get('/students')
  async getStudents(@CurrentUser('userId') supervisorId: number) {
    return this.supervisorsService.getStudents(supervisorId);
  }

  @Roles(Role.Supervisor)
  @Get('/students/:studentId')
  async getStudentById(@CurrentUser('userId') supervisorId: number, @Param('studentId') studentId: number) {
    return this.supervisorsService.getStudentById(supervisorId, studentId);
  }

  @Roles(Role.Supervisor)
  @Get('/students/:studentId/tasks')
  async getStudentTasks(@CurrentUser('userId') supervisorId: number, @Param('studentId') studentId: number) {
    return this.supervisorsService.getStudentTasks(supervisorId, studentId);
  }

  @Roles(Role.Supervisor)
  @Get('/students/:studentId/tasks/:taskId')
  async getStudentTask(@CurrentUser('userId') supervisorId: number, @Param('studentId') studentId: number, @Param('taskId') taskId: number) {
    return this.supervisorsService.getStudentTask(supervisorId, studentId, taskId);
  }

  @Roles(Role.Supervisor)
  @Post('/students/:studentId/tasks/:taskId/review')
  async reviewTask(@CurrentUser('userId') supervisorId: number, @Param('studentId') studentId: number, @Param('taskId') taskId: number, @Body() reviewTaskDto: ReviewTaskDto) {
    return this.supervisorsService.reviewTask(supervisorId, studentId, taskId, reviewTaskDto);
  }

  @Roles(Role.Supervisor)
  @Get('/dashboard-stats')
  async getDashboardStats(@CurrentUser('userId') supervisorId: number) {
    return this.supervisorsService.getDashboardStats(supervisorId);
  }

  @Roles(Role.Supervisor)
  @Post('/assign-task')
  async assignTaskToAllStudents(@CurrentUser('userId') supervisorId: number, @Body() assignTaskDto: AssignTaskDto) {
    return this.supervisorsService.assignTaskToAllStudents(supervisorId, assignTaskDto.taskName, assignTaskDto.description, new Date(assignTaskDto.dueDate));
  }

  @Roles(Role.Supervisor)
  @Get('/all-projects')
  async getAllProjects() {
    return this.supervisorsService.getAllProjects();
  }

  @Roles(Role.Supervisor)
  @Get('/assigned-tasks')
  async getAllAssignedTasks(@CurrentUser('userId') supervisorId: number) {
    return this.supervisorsService.getAllAssignedTasks(supervisorId);
  }

  @Roles(Role.Supervisor)
  @Get('/notifications')
  async getNotifications(@CurrentUser('userId') supervisorId: number) {
    return this.notificationsService.getNotifications(supervisorId, 'supervisor');
  }

  @Roles(Role.Supervisor)
  @Patch('/notifications/:id/read')
  async markNotificationAsRead(@CurrentUser('userId') supervisorId: number, @Param('id') notificationId: number) {
    return this.notificationsService.markAsRead(notificationId, supervisorId);
  }

  @Roles(Role.Supervisor)
  @Get('/notifications/unread-count')
  async getUnreadCount(@CurrentUser('userId') supervisorId: number) {
    const count = await this.notificationsService.getUnreadCount(supervisorId, 'supervisor');
    return { unreadCount: count };
  }
}
