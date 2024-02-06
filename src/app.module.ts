import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './common/logger.middleware';
import { EmployeesModule } from './employees/employees.module';
import { JobsModule } from './jobs/jobs.module';
import { DepartmentsModule } from './departments/departments.module';

@Module({
  imports: [EmployeesModule, JobsModule, DepartmentsModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
