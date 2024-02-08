import { Body, Controller, Post } from '@nestjs/common';
import { BusinessService } from '../service/business.service';
import {
  BusinessStatusReqDto,
  BusinessValidateReqDto,
} from './business.req.dto';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  BusinessStatusResDto,
  BusinessValidateResDto,
} from './business.res.dto';

@ApiTags('business')
@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @ApiOperation({
    summary: '사업자 등록 정보 진위 확인 API',
    description:
      '입력한 사업자 정보에 대한 일치여부 제공.\n' +
      '1회 호출 시 최대 100개 에 해당하는 사업자 상태정보 요청 가능.\n' +
      '일치할경우, valid: 01 및 해당하는 사업자 정보 return.\n' +
      '일치하지 않을 경우, valid: 02, valid_msg: 확인할 수 없습니다 return.',
  })
  @ApiOkResponse({
    type: BusinessValidateResDto,
    description: '정상 호출',
  })
  @ApiBadRequestResponse({
    description: 'JSON 포맷에 적합하지 않는 요청',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
  })
  @Post('validate')
  validate(@Body() businessValidateReqDto: BusinessValidateReqDto) {
    return this.businessService.validate(businessValidateReqDto);
  }

  @ApiOperation({
    summary: '사업자 등록 상태 조회 API',
    description:
      '사업자 상태조회 정보 제공.\n' +
      '1회 호출 시 최대 100개 에 해당하는 사업자 상태정보 요청 가능.',
  })
  @ApiOkResponse({
    type: BusinessStatusResDto,
    description: '정상 호출',
  })
  @ApiBadRequestResponse({
    description: 'JSON 포맷에 적합하지 않는 요청',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
  })
  @Post('status')
  status(@Body() businessStatusReqDto: BusinessStatusReqDto) {
    return this.businessService.status(businessStatusReqDto);
  }
}
