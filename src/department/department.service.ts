import { Injectable } from '@nestjs/common';
import { Prisma, departments } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DepartmentService {
  constructor(private prisma: PrismaService) {}
  async getAllDepartments(params: {
    skip?: number;
    take?: number;
  }): Promise<departments[]> {
    const { skip, take } = params;
    return await this.prisma.departments.findMany({
      skip,
      take,
    });
  }
  async getDepartmentById(
    _departmentsWhereUniqueInput: Prisma.departmentsWhereUniqueInput,
  ): Promise<departments> {
    return await this.prisma.departments.findUnique({
      where: _departmentsWhereUniqueInput,
    });
  }
}
