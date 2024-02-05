import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './common/logger.middleware';
import { EmployeesModule } from './employees/employees.module';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [EmployeesModule, JobsModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
