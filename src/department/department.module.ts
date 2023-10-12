import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DepartmentService } from './department.service';

@Module({
  imports: [PrismaModule],
  controllers: [DepartmentController],
  providers: [DepartmentService],
})
export class DepartmentModule {}
