import { Module } from '@nestjs/common';
import { DepartmentsController } from './controller/departments.controller';
import { DepartmentsService } from './service/departments.service';
import { DepartmentsRepository } from './repository/departments.repository';
import { RepositoryModule } from '../repository/repository.module';

@Module({
  imports: [RepositoryModule],
  controllers: [DepartmentsController],
  providers: [DepartmentsService, DepartmentsRepository],
})
export class DepartmentsModule {}
