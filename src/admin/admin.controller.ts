import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role, Roles } from 'src/auth/decorators/roles.decorators';
import { AdminService } from './admin.service';
import { CreateStudentDto, CreateSupervisorDto, DeleteByIdDto, UpdateStudentDto } from './dto/create-user.dto';

@ApiTags('Admin')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Roles(Role.Admin)
  @Get('/students')
  async getAllStudents() {
    return this.adminService.getAllStudents();
  }

  @Roles(Role.Admin)
  @Get('/students-with-supervisors')
  async getAllStudentsWithSupervisors() {
    return this.adminService.getAllStudentsWithSupervisors();
  }

  @Roles(Role.Admin)
  @Get('/supervisors')
  async getAllSupervisors() {
    return this.adminService.getAllSupervisors();
  }

  @Roles(Role.Admin)
  @Get('/students/with-supervisor')
  async getStudentsWithSupervisor() {
    return this.adminService.getStudentsWithSupervisor();
  }

  @Roles(Role.Admin)
  @Get('/students/without-supervisor')
  async getStudentsWithoutSupervisor() {
    return this.adminService.getStudentsWithoutSupervisor();
  }

  @Roles(Role.Admin)
  @Get('/projects/completed')
  async getCompletedProjects() {
    return this.adminService.getCompletedProjects();
  }

  @Roles(Role.Admin)
  @Get('/projects/in-progress')
  async getProjectsInProgress() {
    return this.adminService.getProjectsInProgress();
  }

  @Roles(Role.Admin)
  @Get('/projects/not-started')
  async getProjectsNotStarted() {
    return this.adminService.getProjectsNotStarted();
  }

  @Roles(Role.Admin)
  @Get('/dashboard-stats')
  async getDashboardStats() {
    return this.adminService.getDashboardStats();
  }

  @Roles(Role.Admin)
  @Post('/students')
  async addStudent(@Body() dto: CreateStudentDto) {
    return this.adminService.addStudent(dto);
  }

  @Roles(Role.Admin)
  @Post('/supervisors')
  async addSupervisor(@Body() dto: CreateSupervisorDto) {
    return this.adminService.addSupervisor(dto);
  }

  @Roles(Role.Admin)
  @Patch('/update-student')
  async updateStudent(@Body() dto: UpdateStudentDto) {
    return this.adminService.updateStudent(dto.id, dto);
  }

  @Roles(Role.Admin)
  @Delete('/delete-student')
  async deleteStudent(@Body() dto: DeleteByIdDto) {
    return this.adminService.deleteStudent(Number(dto.id));
  }

  @Roles(Role.Admin)
  @Delete('/delete-supervisor')
  async deleteSupervisor(@Body() dto: DeleteByIdDto) {
    return this.adminService.deleteSupervisor(Number(dto.id));
  }
}
