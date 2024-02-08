import { BusinessesAuthenticity } from '../domain/business';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class BusinessAuthenticityReq implements BusinessesAuthenticity {
  @ApiProperty({
    type: String,
    default: '00000000',
    description: '사업자 등록 번호',
  })
  @IsNotEmpty()
  bNo: string;

  @ApiProperty({
    type: String,
    default: '20000101',
    description: '개업 일자 (YYYYMMDD 포맷)',
  })
  @IsNotEmpty()
  startDt: string;

  @ApiProperty({
    type: String,
    default: '홍길동',
    description: '대표자 성명 1',
  })
  @IsNotEmpty()
  pNm: string;

  @ApiProperty({
    type: String,
    default: '홍길동',
    description:
      '대표자 성명 2 - 대표자 성명1이 한글이 아닌 경우, 이에 대한 한글명',
  })
  @IsNotEmpty()
  pNm2: string;

  @ApiProperty({
    type: String,
    default: '(주) 테스트',
    description: '상호 (Optional)',
  })
  @IsOptional()
  bNm: string;

  @ApiProperty({
    type: String,
    default: '0000000000000000',
    description: '법인등록번호 (Optional)',
  })
  @IsOptional()
  corpNo: string;

  @ApiProperty({
    type: String,
    default: '',
    description: '주업태명(Optional)',
  })
  @IsOptional()
  bSector: string;

  @ApiProperty({
    type: String,
    default: '',
    description: '주종목명(Optional)',
  })
  @IsOptional()
  bType: string;

  @ApiProperty({
    type: String,
    default: '',
    description: '사업장 주소(Optional)',
  })
  @IsOptional()
  bAdr: string;
}

export class BusinessValidateReqDto {
  @ApiProperty({
    type: [BusinessAuthenticityReq],
  })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => BusinessAuthenticityReq)
  businesses: BusinessAuthenticityReq[];
}

export class BusinessStatusReqDto {
  @ApiProperty({
    type: [String],
    default: ['00000000'],
    description: '사업자 등록 번호',
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsNotEmpty()
  bNo: string[];
}
