import { ApiProperty } from '@nestjs/swagger';
import { BusinessAuthenticityReq } from './business.req.dto';

export class BusinessStatus {
  @ApiProperty({
    type: String,
    default: '00000000',
    description: '사업자 등록 번호',
  })
  bNo: string;

  @ApiProperty({
    type: String,
    default: '계속사업자',
    description: '납세자상태(명칭): 01: 계속사업자, 02: 휴업자, 03: 폐업자',
  })
  bStt: string;

  @ApiProperty({
    type: String,
    default: '01',
    description: '납세자상태(코드): 01: 계속사업자, 02: 휴업자, 03: 폐업자',
  })
  bSttCd: string;

  @ApiProperty({
    type: String,
    default: '부가가치세 일반 과세자',
    description:
      '과세유형메세지(명칭):\n' +
      '01:부가가치세 일반과세자,\n' +
      '02:부가가치세 간이과세자,\n' +
      '03:부가가치세 과세특례자,\n' +
      '04:부가가치세 면세사업자,\n' +
      '05:수익사업을 영위하지 않는 비영리법인이거나 고유번호가 부여된 단체,국가기관 등,\n' +
      '06:고유번호가 부여된 단체,\n' +
      '07:부가가치세 간이과세자(세금계산서 발급사업자),\n' +
      '* 등록되지 않았거나 삭제된 경우: "국세청에 등록되지 않은 사업자등록번호입니다"',
  })
  taxType: string;

  @ApiProperty({
    type: String,
    default: '01',
    description:
      '과세유형메세지(코드):\n' +
      '01:부가가치세 일반과세자,\n' +
      '02:부가가치세 간이과세자,\n' +
      '03:부가가치세 과세특례자,\n' +
      '04:부가가치세 면세사업자,\n' +
      '05:수익사업을 영위하지 않는 비영리법인이거나 고유번호가 부여된 단체,국가기관 등,\n' +
      '06:고유번호가 부여된 단체,\n' +
      '07:부가가치세 간이과세자(세금계산서 발급사업자),\n' +
      '* 등록되지 않았거나 삭제된 경우: "국세청에 등록되지 않은 사업자등록번호입니다"',
  })
  taxTypeCd: string;

  @ApiProperty({
    type: String,
    default: '20000101',
    description: '폐업일 (YYYYMMDD 포맷)',
  })
  endDt: string;

  @ApiProperty({
    type: String,
    default: 'Y',
    description: '단위과세전환폐업여부(Y,N)',
  })
  utccYn: string;

  @ApiProperty({
    type: String,
    default: '20000101',
    description: '최근과세유형전환일자 (YYYYMMDD 포맷)',
  })
  taxTypeChangeDt: string;

  @ApiProperty({
    type: String,
    default: '20000101',
    description: '세금계산서적용일자 (YYYYMMDD 포맷)',
  })
  invoiceApplyDt: string;

  @ApiProperty({
    type: String,
    default: '부가가치세 일반과세자',
    description:
      '직전과세유형메세지(명칭):\n' +
      '01:부가가치세 일반과세자,\n' +
      '02:부가가치세 간이과세자,\n' +
      '07:부가가치세 간이과세자(세금계산서 발급사업자),\n' +
      '99:해당없음',
  })
  rbfTaxType: string;

  @ApiProperty({
    type: String,
    default: '01',
    description:
      '직전과세유형메세지(코드):\n' +
      '01:부가가치세 일반과세자,\n' +
      '02:부가가치세 간이과세자,\n' +
      '07:부가가치세 간이과세자(세금계산서 발급사업자),\n' +
      '99:해당없음',
  })
  rbfTaxTypeCd: string;
}

export class RequestParam extends BusinessAuthenticityReq {}

export class BusinessValidate {
  @ApiProperty({
    type: String,
    default: '00000000',
    description: '사업자 등록 번호',
  })
  bNo: string;

  @ApiProperty({
    type: String,
  })
  valid: string;

  @ApiProperty({
    type: String,
  })
  validMsg: string;

  @ApiProperty({
    type: RequestParam,
  })
  requestParam: RequestParam;

  @ApiProperty({
    type: BusinessStatus,
  })
  status: BusinessStatus;
}

export class BusinessValidateResDto {
  @ApiProperty({
    type: Number,
    default: 1,
  })
  requestCnt: number;

  @ApiProperty({
    type: String,
    default: 'OK',
  })
  statusCode: string;

  @ApiProperty({
    type: [BusinessValidate],
  })
  data: BusinessValidate[];
}

export class BusinessStatusResDto {
  @ApiProperty({
    type: Number,
    default: 1,
  })
  requestCnt: number;

  @ApiProperty({
    type: String,
    default: 'OK',
  })
  statusCode: string;

  @ApiProperty({
    type: [BusinessStatus],
  })
  data: BusinessStatus[];
}
