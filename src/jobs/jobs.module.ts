import { RepositoryModule } from '../repository/repository.module';
import { Module } from '@nestjs/common';
import { JobsController } from './controller/jobs.controller';
import { JobsService } from './service/jobs.service';
import { JobHistoryRepository } from './repository/jobHistory.repository';

@Module({
  imports: [RepositoryModule],
  controllers: [JobsController],
  providers: [JobsService, JobHistoryRepository],
})
export class JobsModule {}
