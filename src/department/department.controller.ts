import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { departments } from '@prisma/client';

@Controller('department')
export class DepartmentController {
  constructor(private readonly deptService: DepartmentService) {}
  @Post()
  async getAllDepartments(
    @Body() inputs: { skip?: number; take?: number },
  ): Promise<departments[]> {
    return await this.deptService.getAllDepartments({
      skip: inputs.skip,
      take: inputs.take,
    });
  }
  @Get(':id')
  async getDepartmentById(@Param('id') id: string): Promise<departments> {
    return await this.deptService.getDepartmentById({
      department_id: Number(id),
    });
  }
}
