import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  HttpStatus,
  Res,
  Bind,
  UsePipes,
  ParseIntPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { DepartmentService } from './department.service';
import { departments } from '@prisma/client';
import { z } from 'zod';
import { ZodValidationPipe } from 'src/common/zod-validation.pipe';

export const getAllDepartmentsZodSchema = z
  .object({
    skip: z.number().nonnegative().default(0),
    take: z.number().positive().default(10),
  })
  .required();

export type getAllDepartmentsInput = z.infer<typeof getAllDepartmentsZodSchema>;

@Controller('department')
export class DepartmentController {
  constructor(private readonly deptService: DepartmentService) {}

  @Post()
  @Bind(Body())
  @UsePipes(new ZodValidationPipe(getAllDepartmentsZodSchema))
  async getAllDepartments(
    inputs: getAllDepartmentsInput,
    @Res() res: Response,
  ) {
    const ret = await this.deptService.getAllDepartments({
      skip: inputs.skip,
      take: inputs.take,
    });

    res.status(HttpStatus.OK).json({ resultCode: 1, msg: 'ok', payload: ret });
  }
  @Get(':id')
  async getDepartmentById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const ret: departments = await this.deptService.getDepartmentById({
      department_id: id,
    });

    res.status(HttpStatus.OK).json({ resultCode: 1, msg: 'ok', payload: ret });
  }
}
