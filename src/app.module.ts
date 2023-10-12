import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { EmployeeService } from './employee/employee.service';
import { EmployeeModule } from './employee/employee.module';
import { EmployeeController } from './employee/employee.controller';
import { DepartmentService } from './department/department.service';
import { DepartmentModule } from './department/department.module';
import { DepartmentController } from './department/department.controller';

@Module({
  imports: [PrismaModule, EmployeeModule, DepartmentModule],
  controllers: [AppController, EmployeeController, DepartmentController],
  providers: [AppService, EmployeeService, DepartmentService],
})
export class AppModule {}
