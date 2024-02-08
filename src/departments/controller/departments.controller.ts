import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { DepartmentsService } from '../service/departments.service';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { DepartmentsFindAllResDto } from './departments.res.dto';

@ApiTags('departments')
@Controller('/departments')
export class DepartmentsController {
  constructor(private departmentsService: DepartmentsService) {}

  @ApiOperation({
    summary: '부서 및 위치 정보 조회 API',
    description: '부서에 따른 위치 정보 조회',
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
    description: '검색하고자 하는 이름',
  })
  @ApiOkResponse({
    type: DepartmentsFindAllResDto,
    description: '구매 물품 조회 성공',
  })
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
}
