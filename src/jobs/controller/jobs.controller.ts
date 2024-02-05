import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { JobsService } from '../service/jobs.service';

@Controller('/jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Get('/history/:employeeId')
  findAllHistoryOfEmployee(
    @Param('employeeId', ParseIntPipe) employeeId: number,
  ) {
    return this.jobsService.findAllHistoryOfEmployee(employeeId);
  }
}
