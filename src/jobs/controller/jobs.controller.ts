import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { JobsService } from '../service/jobs.service';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JobsFindAllHistoryOfEmployeeResDto } from './jobs.res.dto';

@ApiTags('jobs')
@Controller('/jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @ApiOperation({
    summary: '특정 사원 id를 통한 이력 정보 조회 ',
  })
  @ApiParam({
    type: Number,
    name: 'employeeId',
    description: '조회 하고자 하는 사원 Id',
  })
  @ApiOkResponse({
    type: JobsFindAllHistoryOfEmployeeResDto,
    description: '특정 사원 매니저 업데이트 성공',
  })
  @Get('/history/:employeeId')
  findAllHistoryOfEmployee(
    @Param('employeeId', ParseIntPipe) employeeId: number,
  ) {
    return this.jobsService.findAllHistoryOfEmployee(employeeId);
  }
}
