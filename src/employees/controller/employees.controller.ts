import { EmployeesService } from '../service/employees.service';
import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';

@Controller('/employees')
export class EmployeesController {
  constructor(private employeesService: EmployeesService) {}

  // 사원 전체 조회
  @Get('')
  findAll(
    @Query('lastEmployeeId', new DefaultValuePipe(0), ParseIntPipe)
    lastEmployeeId: number,
    @Query('take', new DefaultValuePipe(50), ParseIntPipe)
    take: number,
  ) {
    return this.employeesService.findAll(lastEmployeeId, take);
  }

  // 특정 사원의 현재 정보 조회
  @Get(':employeeId')
  findOne(@Param('employeeId', ParseIntPipe) employeeId: number) {
    return this.employeesService.findOneDetail(employeeId);
  }

  // 특정 사원의 이력 정보 조회

  // 사원 정보 업데이트
}
