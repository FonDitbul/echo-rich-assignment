import { EmployeesService } from '../service/employees.service';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { EmployeesUpdateDto } from './employees.dto';

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
    @Query('searchName') searchName?: string,
  ) {
    return this.employeesService.findAll(lastEmployeeId, take, searchName);
  }

  // 특정 사원의 현재 정보 조회
  @Get(':employeeId')
  findOneDetail(@Param('employeeId', ParseIntPipe) employeeId: number) {
    return this.employeesService.findOneDetail(employeeId);
  }

  // 사원 정보 업데이트
  // 개인정보 업데이트,
  @Patch('')
  async update(@Body() updateDto: EmployeesUpdateDto) {
    await this.employeesService.update(updateDto);
    return true;
  }

  // manager_id
}
