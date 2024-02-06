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
import {
  EmployeesUpdateDto,
  EmployeesUpdateManagerDto,
  EmployeesUpdateSalaryByDepartmentId,
} from './employees.dto';

@Controller('/employees')
export class EmployeesController {
  constructor(private employeesService: EmployeesService) {}

  // 사원 전체 조회 API
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

  // 특정 사원의 현재 정보 조회 API
  @Get(':employeeId')
  findOneDetail(@Param('employeeId', ParseIntPipe) employeeId: number) {
    return this.employeesService.findOneDetail(employeeId);
  }

  // 특정 사원 정보 업데이트 API
  @Patch('')
  async update(@Body() updateDto: EmployeesUpdateDto) {
    await this.employeesService.update(updateDto);
    return true;
  }

  // 특정 사원 manager 업데이트 API
  @Patch('manager')
  async updateManager(@Body() updateDto: EmployeesUpdateManagerDto) {
    await this.employeesService.updateManager(updateDto);
    return true;
  }

  // 특정 부서 급여 특정 비율 인상 API
  @Patch('/departments/increase-salary')
  async updateAllIncreaseSalaryByDepartmentId(
    @Body() updateDto: EmployeesUpdateSalaryByDepartmentId,
  ) {
    await this.employeesService.updateAllIncreaseSalaryByDepartmentId(
      updateDto,
    );
    return true;
  }
}
