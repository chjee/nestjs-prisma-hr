import {
  Controller,
  Get,
  Post,
  Param,
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

@Controller('employee')
export class EmployeeController {
  constructor(private readonly empService: EmployeeService) {}

  @Post()
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

  @Post('history')
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
