import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { employees, job_history } from '@prisma/client';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly empService: EmployeeService) {}

  @Post()
  async getAllEmployees(@Body() inputs: { skip?: number; take?: number }) {
    const ret: employees[] = await this.empService.getAllEmployees({
      skip: inputs.skip,
      take: inputs.take,
    });

    return { resultCode: 1, msg: 'ok', payload: ret };
  }

  @Get(':id')
  async getEmployeeById(@Param('id') id: string) {
    const ret: employees = await this.empService.getEmployeeById({
      employee_id: Number(id),
    });

    return { resultCode: 1, msg: 'ok', payload: ret };
  }

  @Post('history')
  async getHistories(
    @Body() inputs: { id?: number; skip?: number; take?: number },
  ) {
    const ret: job_history[] = await this.empService.getHistories({
      id: inputs.id,
      skip: inputs.skip,
      take: inputs.take,
    });

    return { resultCode: 1, msg: 'ok', payload: ret };
  }
}
