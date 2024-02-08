import { Test, TestingModule } from '@nestjs/testing';
import { BusinessService } from './business.service';
import { BusinessHttp } from '../infrastructure/business.http';
import {
  BusinessStatusReqDto,
  BusinessValidateReqDto,
} from '../controller/business.req.dto';

const mockBusinessHttp = {
  validate: jest.fn(),
  status: jest.fn(),
};
describe('BusinessService', () => {
  let sut: BusinessService;
  let businessHttp;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessService,
        {
          provide: BusinessHttp,
          useValue: mockBusinessHttp,
        },
      ],
    }).compile();

    sut = module.get<BusinessService>(BusinessService);
    businessHttp = module.get<BusinessHttp>(BusinessHttp);
  });

  describe('validate 테스트', () => {
    it('validate dto를 입력받아 타 서버 호출에 성공한 경우', () => {
      const givenDto: BusinessValidateReqDto = { businesses: [] };

      sut.validate(givenDto);

      expect(businessHttp.validate).toHaveBeenCalledWith(givenDto);
    });
  });

  describe('status 테스트', () => {
    it('status dto를 입력받아 타 서버 호출에 성공한 경우', () => {
      const givenDto: BusinessStatusReqDto = { bNo: ['1213456'] };

      sut.status(givenDto);

      expect(businessHttp.status).toHaveBeenCalledWith(givenDto);
    });
  });
});
