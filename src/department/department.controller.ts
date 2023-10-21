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
  Patch,
} from '@nestjs/common';
import { Response } from 'express';
import { DepartmentService } from './department.service';
import { z } from 'zod';
import { ZodValidationPipe } from 'src/common/zod-validation.pipe';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

export const getAllDepartmentsZodSchema = z
  .object({
    skip: z.number().nonnegative().default(0),
    take: z.number().positive().default(10),
  })
  .required();

export type getAllDepartmentsInput = z.infer<typeof getAllDepartmentsZodSchema>;

@Controller('department')
@ApiTags('department API')
export class DepartmentController {
  constructor(private readonly deptService: DepartmentService) {}

  @Patch()
  @ApiOperation({
    summary: 'Get departments by pagination',
    description: 'Get all departments by pagination',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        skip: {
          type: 'number',
          nullable: true,
          default: 0,
        },
        take: {
          type: 'number',
          nullable: true,
          default: 10,
        },
      },
    },
  })
  @Bind(Body())
  @UsePipes(new ZodValidationPipe(getAllDepartmentsZodSchema))
  async getAllDepartments(
    inputs: getAllDepartmentsInput,
    @Res() res: Response,
  ) {
    const ret = await this.deptService.getAllDepartments(inputs);
    // const ret = await this.deptService.getAllDepartments({
    //   skip: inputs.skip,
    //   take: inputs.take,
    // });

    if (!ret) {
      res.status(HttpStatus.NOT_FOUND).json({
        resultCode: 0,
        msg: 'not found',
        payload: null,
      });
      return;
    }
    res.status(HttpStatus.OK).json({ resultCode: 1, msg: 'ok', payload: ret });
  }
  @Get(':id')
  @ApiOperation({
    summary: 'Get department by id',
    description: 'Get department by id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'department_id',
    schema: {
      type: 'number',
    },
  })
  async getDepartmentById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const ret = await this.deptService.getDepartmentById({ id });
    // const ret: departments = await this.deptService.getDepartmentById({
    //   department_id: id,
    // });
    if (!ret) {
      res.status(HttpStatus.NOT_FOUND).json({
        resultCode: 0,
        msg: 'not found',
        payload: null,
      });
      return;
    }

    res.status(HttpStatus.OK).json({ resultCode: 1, msg: 'ok', payload: ret });
  }
}
