import { Module } from '@nestjs/common';
import { EmployeeModule } from './employee/employee.module';
import { DepartmentModule } from './department/department.module';

@Module({
  imports: [EmployeeModule, DepartmentModule],
})
export class AppModule {}
