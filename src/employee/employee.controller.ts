import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Bind,
  Body,
  UsePipes,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { z } from 'zod';
import { ZodValidationPipe } from 'src/common/zod-validation.pipe';

export const getAllEmployeesZodSchema = z
  .object({
    skip: z.number().nonnegative().default(0),
    take: z.number().positive().default(10),
  })
  .required();

export type getAllEmployeesInput = z.infer<typeof getAllEmployeesZodSchema>;

export const getHistoriesZodSchema = z
  .object({
    id: z.number().positive(),
    skip: z.number().nonnegative().default(0),
    take: z.number().positive().default(10),
  })
  .required();

export type getHistoriesInput = z.infer<typeof getHistoriesZodSchema>;

export const createEmployeeZodSchema = z
  .object({
    employee_id: z.number().positive(),
    first_name: z.string().min(1).max(45).nullable(),
    last_name: z.string().min(1).max(45),
    email: z.string().min(1).max(45),
    phone_number: z.string().min(1).max(45).nullable(),
    hire_date: z.string(),
    job_id: z.string().min(1).max(10),
    salary: z.number().positive(),
    commission_pct: z.number().positive().nullable(),
    manager_id: z.number().positive().nullable(),
    department_id: z.number().positive().nullable(),
  })
  .required();

export type createEmployeeInput = z.infer<typeof createEmployeeZodSchema>;

@Controller('employee')
export class EmployeeController {
  constructor(private readonly empService: EmployeeService) {}

  @Patch()
  @UsePipes(new ZodValidationPipe(getAllEmployeesZodSchema))
  async getAllEmployees(@Body() inputs: getAllEmployeesInput) {
    const ret = await this.empService.getAllEmployees({
      skip: inputs.skip,
      take: inputs.take,
    });

    if (!ret) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return { resultCode: 1, msg: 'ok', payload: ret };
  }

  @Get(':id')
  async getEmployeeById(@Param('id', ParseIntPipe) id: number) {
    const ret = await this.empService.getEmployeeById({
      employee_id: Number(id),
    });

    if (!ret) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return { resultCode: 1, msg: 'ok', payload: ret };
  }

  @Post()
  @Bind(Body())
  @UsePipes(new ZodValidationPipe(createEmployeeZodSchema))
  async createEmployee(inputs: createEmployeeInput) {
    console.log('inputs :', inputs);
    const ret = await this.empService.createEmployee({
      employee_id: inputs.employee_id,
      first_name: inputs.first_name,
      last_name: inputs.last_name,
      email: inputs.email,
      phone_number: inputs.phone_number,
      hire_date: inputs.hire_date,
      job_id: inputs.job_id,
      salary: inputs.salary,
      commission_pct: inputs.commission_pct,
      manager_id: inputs.manager_id,
      department_id: inputs.department_id,
    });
    return { resultCode: 1, msg: 'ok', payload: ret };
  }

  @Put()
  @Bind(Body())
  @UsePipes(new ZodValidationPipe(createEmployeeZodSchema))
  async updateEmployee(inputs: createEmployeeInput) {
    const ret = await this.empService.updateEmployee({
      where: { employee_id: inputs.employee_id },
      data: {
        first_name: inputs.first_name,
        last_name: inputs.last_name,
        email: inputs.email,
        phone_number: inputs.phone_number,
        hire_date: inputs.hire_date,
        job_id: inputs.job_id,
        salary: inputs.salary,
        commission_pct: inputs.commission_pct,
        manager_id: inputs.manager_id,
        department_id: inputs.department_id,
      },
    });

    return { resultCode: 1, msg: 'ok', payload: ret };
  }

  @Delete(':id')
  async deleteEmployeeById(@Param('id', ParseIntPipe) id: number) {
    const ret = await this.empService.deleteEmployeeById({
      employee_id: id,
    });

    if (!ret) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return { resultCode: 1, msg: 'ok', payload: ret };
  }

  @Patch('history')
  // @Bind(Body())
  @UsePipes(new ZodValidationPipe(getHistoriesZodSchema))
  async getHistories(@Body() inputs: getHistoriesInput) {
    const ret = await this.empService.getHistories({
      id: inputs.id,
      skip: inputs.skip,
      take: inputs.take,
    });

    if (!ret) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return { resultCode: 1, msg: 'ok', payload: ret };
  }
}
