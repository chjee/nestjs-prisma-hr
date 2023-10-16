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
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

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
@ApiTags('employee API')
export class EmployeeController {
  constructor(private readonly empService: EmployeeService) {}

  @Patch()
  @ApiOperation({
    summary: 'Get employees by pagination',
    description: 'Get all employees by pagination',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        skip: {
          type: 'number',
          description: 'skip asas',
          default: 0,
        },
        take: {
          type: 'number',
          description: 'take asas',
          default: 10,
        },
      },
    },
  })
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
  @ApiOperation({
    summary: 'Get employee by id',
    description: 'Get employee by id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'employee_id',
    schema: {
      type: 'number',
    },
  })
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
  @ApiOperation({
    summary: 'Create employee',
    description: 'Create employee',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        employee_id: {
          type: 'number',
          description: 'employee_id',
          default: 207,
        },
        first_name: {
          type: 'string',
          description: 'first_name',
          default: 'Changhoon',
        },
        last_name: {
          type: 'string',
          description: 'last_name',
          default: 'Jee',
        },
        email: {
          type: 'string',
          description: 'email',
          default: 'chjee',
        },
        phone_number: {
          type: 'string',
          description: 'phone_number',
          default: '82.10.2906.3992',
        },
        hire_date: {
          type: 'string',
          description: 'hire_date',
          default: '2023-10-12T00:00:00.000Z',
        },
        job_id: {
          type: 'string',
          description: 'job_id',
          default: 'IT_PROG',
        },
        salary: {
          type: 'number',
          description: 'salary',
          default: 9600,
        },
        commission_pct: {
          type: 'number',
          description: 'commission_pct',
          default: 0.2,
        },
        manager_id: {
          type: 'number',
          description: 'manager_id',
          default: 103,
        },
        department_id: {
          type: 'number',
          description: 'department_id',
          default: 60,
        },
      },
    },
  })
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
  @ApiOperation({
    summary: 'Update employee',
    description: 'Update employee',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        employee_id: {
          type: 'number',
          description: 'employee_id',
          default: 207,
        },
        first_name: {
          type: 'string',
          description: 'first_name',
          default: 'Changhoon',
        },
        last_name: {
          type: 'string',
          description: 'last_name',
          default: 'Jee',
        },
        email: {
          type: 'string',
          description: 'email',
          default: 'chjee',
        },
        phone_number: {
          type: 'string',
          description: 'phone_number',
          default: '82.10.2906.3992',
        },
        hire_date: {
          type: 'string',
          description: 'hire_date',
          default: '2023-10-12T00:00:00.000Z',
        },
        job_id: {
          type: 'string',
          description: 'job_id',
          default: 'IT_PROG',
        },
        salary: {
          type: 'number',
          description: 'salary',
          default: 9600,
        },
        commission_pct: {
          type: 'number',
          description: 'commission_pct',
          default: 0.2,
        },
        manager_id: {
          type: 'number',
          description: 'manager_id',
          default: 103,
        },
        department_id: {
          type: 'number',
          description: 'department_id',
          default: 60,
        },
      },
    },
  })
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
  @ApiOperation({
    summary: 'Delete employee by id',
    description: 'Delete employee by id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'employee_id',
    schema: {
      type: 'number',
    },
  })
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
  @ApiOperation({
    summary: 'Get employee history by pagination',
    description: 'Get employee history by pagination',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: 'employee_id',
          default: 176,
        },
        skip: {
          type: 'number',
          description: 'skip',
          default: 0,
        },
        take: {
          type: 'number',
          description: 'take',
          default: 10,
        },
      },
    },
  })
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
