import { Injectable } from '@nestjs/common';
import { JobHistoryRepository } from '../repository/jobHistory.repository';

@Injectable()
export class JobsService {
  constructor(private jobsHistoryRepository: JobHistoryRepository) {}

  findAllHistoryOfEmployee(employeeId: number) {
    const jobHistoryList =
      this.jobsHistoryRepository.findAllByEmployeeId(employeeId);

    return jobHistoryList;
  }
}
