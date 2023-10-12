import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { employees, job_history } from '@prisma/client';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly empService: EmployeeService) {}
  @Post()
  async getAllEmployees(
    @Body() inputs: { skip?: number; take?: number },
  ): Promise<employees[] | null> {
    return await this.empService.getAllEmployees({
      skip: inputs.skip,
      take: inputs.take,
    });
  }
  @Get(':id')
  async getEmployeeById(@Param('id') id: string): Promise<employees> {
    return await this.empService.getEmployeeById({ employee_id: Number(id) });
  }
  // @Get(':id')
  // async getEmployeeById(@Param('id') id: string): Promise<employees | null> {
  //   console.log('id :', id);
  //   return await this.empService.getEmployeeById(Number(id));
  // }
  @Post('history')
  async getHistories(
    @Body() inputs: { id?: number; skip?: number; take?: number },
  ): Promise<job_history[]> {
    return await this.empService.getHistories({
      id: inputs.id,
      skip: inputs.skip,
      take: inputs.take,
    });
  }
}
