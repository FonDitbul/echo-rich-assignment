import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmployeesUpdateReqDto {
  @ApiProperty({
    type: Number,
    example: 1,
    description: '업데이트 하고자 하는 사원 id',
  })
  @IsNotEmpty()
  @IsNumber()
  readonly employeeId: number;

  @ApiProperty({
    type: String,
    example: 'test',
    description: 'firstName',
  })
  @IsNotEmpty()
  @MaxLength(20)
  @IsString()
  readonly firstName: string;

  @ApiProperty({
    type: String,
    example: 'test',
    description: 'lastName',
  })
  @IsNotEmpty()
  @MaxLength(25)
  @IsString()
  readonly lastName: string;

  @ApiProperty({
    type: String,
    example: 'test@gmail.com',
    description: '이메일',
  })
  @IsNotEmpty()
  @MaxLength(25)
  @IsString()
  readonly email: string;

  @ApiProperty({
    type: String,
    example: '515.123.4567',
    description: '핸드폰번호',
  })
  @IsNotEmpty()
  @MaxLength(20)
  @IsString()
  readonly phoneNumber: string;

  @ApiProperty({
    type: Number,
    example: 10000,
    description: '월급',
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly salary: number;

  @ApiProperty({
    type: Number,
    example: 0.1,
    description: '커미션 퍼센트',
    nullable: true,
  })
  @IsOptional()
  @IsNumber()
  readonly commissionPct: number | null;
}

export class EmployeesUpdateManagerReqDto {
  @ApiProperty({
    type: Number,
    example: 1,
    description: '업데이트 하고자 하는 사원 id',
  })
  @IsNotEmpty()
  @IsNumber()
  readonly employeeId: number;

  @ApiProperty({
    type: Number,
    example: 3,
    description: '업데이트 하고자 하는 매니저 id',
    nullable: true,
  })
  @IsOptional()
  readonly managerId?: number | null;
}

export class EmployeesUpdateSalaryByDepartmentId {
  @ApiProperty({
    type: Number,
    example: 1,
    description: '급여를 인상하고자 하는 특정 부서 id',
  })
  @IsNotEmpty()
  @IsNumber()
  readonly departmentId: number;

  @ApiProperty({
    type: Number,
    example: 1,
    description: '급여 인상 비율 0 ~ 100 입력',
  })
  @Max(100)
  @Min(0)
  @IsNumber()
  readonly increasePct: number;
}
