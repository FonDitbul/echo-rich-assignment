import { Injectable } from '@nestjs/common';
import {
  BusinessStatusReqDto,
  BusinessValidateReqDto,
} from '../controller/business.req.dto';
import { BusinessHttp } from '../infrastructure/business.http';

@Injectable()
export class BusinessService {
  constructor(private businessHttp: BusinessHttp) {}

  async validate(businessValidateReqDto: BusinessValidateReqDto) {
    const resultData = this.businessHttp.validate(businessValidateReqDto);

    return resultData;
  }
  status(businessStatusReqDto: BusinessStatusReqDto) {
    const resultData = this.businessHttp.status(businessStatusReqDto);

    return resultData;
  }
}
