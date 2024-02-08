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
  EmployeesUpdateManagerReqDto,
  EmployeesUpdateReqDto,
  EmployeesUpdateSalaryByDepartmentId,
} from './employees.req.dto';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  EmployeesFindAllResDto,
  EmployeesFindOneResDto,
} from './employees.res.dto';

@ApiTags('employees')
@Controller('/employees')
export class EmployeesController {
  constructor(private employeesService: EmployeesService) {}

  @ApiOperation({
    summary: '사원 전체 조회 API',
    description: '사원 조회',
  })
  @ApiQuery({
    type: Number,
    name: 'lastDepartmentId',
    required: false,
    description: '해당 id 이후의 데이터 조회',
  })
  @ApiQuery({
    type: Number,
    name: 'take',
    required: false,
    description: '가져올 개수 제한 default 10',
  })
  @ApiQuery({
    type: String,
    name: 'searchName',
    required: false,
    description: '검색하고자 하는 firstName or lastName or email 입력',
  })
  @ApiOkResponse({
    type: EmployeesFindAllResDto,
    description: '사원 조회 성공',
  })
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

  @ApiOperation({
    summary: '특정 사원의 현재 정보 조회 API',
    description: 'employeeId를 통해 사원의 현재 정보를 출력합니다.',
  })
  @ApiParam({
    type: Number,
    name: 'employeeId',
    description: '조회 하고자 하는 사원 Id',
  })
  @ApiOkResponse({
    type: EmployeesFindOneResDto,
    description: '사원 조회 성공',
  })
  @ApiNotFoundResponse({
    description: '해당 사원이 존재하지 않을 경우',
  })
  // 특정 사원의 현재 정보 조회 API
  @Get(':employeeId')
  findOneDetail(@Param('employeeId', ParseIntPipe) employeeId: number) {
    return this.employeesService.findOneDetail(employeeId);
  }

  @ApiOperation({
    summary: '특정 사원 정보 업데이트 API',
    description: '특정 사원의 정보를 업데이트 합니다.',
  })
  @ApiOkResponse({
    description: '사원 업데이트 성공',
  })
  @ApiNotFoundResponse({
    description: '해당 사원이 존재하지 않을 경우',
  })
  // 특정 사원 정보 업데이트 API
  @Patch('')
  async update(@Body() updateDto: EmployeesUpdateReqDto) {
    await this.employeesService.update(updateDto);
    return true;
  }

  @ApiOperation({
    summary: '특정 사원 manager 업데이트 API',
    description: '특정 사원의 manager 변경',
  })
  @ApiOkResponse({
    description: '특정 사원 매니저 업데이트 성공',
  })
  @ApiNotFoundResponse({
    description: '해당 매니저가 존재하지 않을 경우',
  })
  // 특정 사원 manager 업데이트 API
  @Patch('manager')
  async updateManager(@Body() updateDto: EmployeesUpdateManagerReqDto) {
    await this.employeesService.updateManager(updateDto);
    return true;
  }

  @ApiOperation({
    summary: '특정 부서 급여 특정 비율 인상 API',
    description:
      '급여가 해당 직군의 최대 보다 높거나 최소보다 낮을 경우 최대 최소로 적용됩니다.',
  })
  @ApiOkResponse({
    description: '특정 부서 급여 인상 성공',
  })
  @ApiNotFoundResponse({
    description: '해당 부서에 사원이 한명도 존재하지 않습니다.',
  })
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
