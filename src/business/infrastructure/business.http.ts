import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import {
  BusinessStatusReqDto,
  BusinessValidateReqDto,
} from '../controller/business.req.dto';
import { camelize, snakeify } from '../../util/convert';

@Injectable()
export class BusinessHttp {
  private serverUrl = 'https://api.odcloud.kr/api/nts-businessman/v1';

  private serverError(error: AxiosError) {
    if (error.code === 'BAD_JSON_REQUEST') {
      return new BadRequestException();
    }
    if (error.code === 'REQUEST_DATA_MALFORMED') {
      return new HttpException('Length Required', 411);
    }
    if (error.code === 'BAD_JSON_REQUEST') {
      return new HttpException('Content Too Large', 413);
    }

    return new InternalServerErrorException();
  }

  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async validate(businessValidateReqDto: BusinessValidateReqDto): Promise<any> {
    const key = this.configService.get<string>('BUSINESS_SERVICE_KEY');
    const url = `${this.serverUrl}/validate?serviceKey=${key}`;

    const convertBusinessList: any = snakeify(businessValidateReqDto);

    const { data } = await firstValueFrom(
      this.httpService.post(url, convertBusinessList).pipe(
        catchError((error: AxiosError) => {
          throw this.serverError(error);
        }),
      ),
    );

    return camelize(data);
  }

  async status(businessStatusReqDto: BusinessStatusReqDto) {
    const key = this.configService.get<string>('BUSINESS_SERVICE_KEY');
    const url = `${this.serverUrl}/status?serviceKey=${key}`;

    const convertBusinessList: any = snakeify(businessStatusReqDto);

    const { data } = await firstValueFrom(
      this.httpService.post(url, convertBusinessList).pipe(
        catchError((error: AxiosError) => {
          throw this.serverError(error);
        }),
      ),
    );

    return camelize(data);
  }
}
