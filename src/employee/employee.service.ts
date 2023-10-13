import { Injectable } from '@nestjs/common';
import { Prisma, employees, job_history } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}
  async getAllEmployees(params: {
    skip?: number;
    take?: number;
  }): Promise<employees[]> {
    const { skip, take } = params;
    return await this.prisma.employees.findMany({
      skip,
      take,
    });
  }

  async getEmployeeById(
    _employeesWhereUniqueInput: Prisma.employeesWhereUniqueInput,
  ): Promise<employees> {
    return await this.prisma.employees.findUnique({
      where: _employeesWhereUniqueInput,
    });
  }

  async getHistories(params: {
    id?: number;
    skip?: number;
    take?: number;
  }): Promise<job_history[]> {
    const { id, skip, take } = params;
    return await this.prisma.job_history.findMany({
      where: { employee_id: id },
      skip,
      take,
    });
  }
}
