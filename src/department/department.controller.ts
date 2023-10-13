import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { DepartmentService } from './department.service';
import { departments } from '@prisma/client';

@Controller('department')
export class DepartmentController {
  constructor(private readonly deptService: DepartmentService) {}
  @Post()
  async getAllDepartments(
    @Body() inputs: { skip?: number; take?: number },
    @Res() res: Response,
  ) {
    const ret: departments[] = await this.deptService.getAllDepartments({
      skip: inputs.skip,
      take: inputs.take,
    });

    res.status(HttpStatus.OK).json({ resultCode: 1, msg: 'ok', payload: ret });
  }
  @Get(':id')
  async getDepartmentById(@Param('id') id: string, @Res() res: Response) {
    const ret: departments = await this.deptService.getDepartmentById({
      department_id: Number(id),
    });

    res.status(HttpStatus.OK).json({ resultCode: 1, msg: 'ok', payload: ret });
  }
}
