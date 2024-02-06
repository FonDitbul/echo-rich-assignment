import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { DepartmentsService } from '../service/departments.service';

@Controller('/departments')
export class DepartmentsController {
  constructor(private departmentsService: DepartmentsService) {}

  // 부서 및 위치 정보 조회 API
  @Get('')
  findAll(
    @Query('lastDepartmentId', new DefaultValuePipe(0), ParseIntPipe)
    lastDepartmentId: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe)
    take: number,
    @Query('searchName') searchName?: string,
  ) {
    return this.departmentsService.findAll(lastDepartmentId, take, searchName);
  }

  // 특정 부서 급여 특정 비율 인상 API
}
