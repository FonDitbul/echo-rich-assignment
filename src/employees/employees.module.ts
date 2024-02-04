import { EmployeesController } from './controller/employees.controller';
import { EmployeesService } from './service/employees.service';
import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repository/repository.module';
import { EmployeesRepository } from './repository/employees.repository';

@Module({
  imports: [RepositoryModule],
  controllers: [EmployeesController],
  providers: [EmployeesService, EmployeesRepository],
})
export class EmployeesModule {}
