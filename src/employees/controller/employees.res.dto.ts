import { ApiProperty } from '@nestjs/swagger';
import { EmpDetailsView, Employees, Prisma } from '@prisma/client';

export class EmployeesSwagger implements Employees {
  @ApiProperty({
    type: Number,
  })
  employeeId: number;

  @ApiProperty({
    type: String,
    nullable: true,
  })
  firstName: string | null;

  @ApiProperty({
    type: String,
  })
  lastName: string;

  @ApiProperty({
    type: String,
  })
  email: string;

  @ApiProperty({
    type: String,
    nullable: true,
  })
  phoneNumber: string | null;

  @ApiProperty({
    type: Date,
  })
  hireDate: Date;

  @ApiProperty({
    type: String,
  })
  jobId: string;

  @ApiProperty({
    type: Number,
  })
  salary: Prisma.Decimal;

  @ApiProperty({
    type: Number,
    nullable: true,
  })
  commissionPct: Prisma.Decimal | null;

  @ApiProperty({
    type: Number,
    nullable: true,
  })
  managerId: number | null;

  @ApiProperty({
    type: Number,
    nullable: true,
  })
  departmentId: number | null;
}

export class EmpDetailsViewSwagger implements EmpDetailsView {
  @ApiProperty({
    type: Number,
  })
  employeeId: number;

  @ApiProperty({
    type: String,
  })
  jobId: string;

  @ApiProperty({
    type: Number,
  })
  managerId: number;

  @ApiProperty({
    type: Number,
  })
  departmentId: number;

  @ApiProperty({
    type: Number,
  })
  locationId: number;

  @ApiProperty({
    type: String,
  })
  countryId: string;

  @ApiProperty({
    type: String,
  })
  firstName: string;

  @ApiProperty({
    type: String,
  })
  lastName: string;

  @ApiProperty({
    type: Number,
  })
  salary: Prisma.Decimal;

  @ApiProperty({
    type: Number,
  })
  commissionPct: Prisma.Decimal;

  @ApiProperty({
    type: String,
  })
  departmentName: string;

  @ApiProperty({
    type: String,
  })
  jobTitle: string;

  @ApiProperty({
    type: String,
  })
  city: string;

  @ApiProperty({
    type: String,
  })
  stateProvince: string;

  @ApiProperty({
    type: String,
  })
  countryName: string;

  @ApiProperty({
    type: String,
  })
  regionName: string;
}

export class EmployeesFindAllResDto {
  @ApiProperty({
    type: EmployeesSwagger,
    isArray: true,
  })
  result: Employees[];
}

export class EmployeesFindOneResDto {
  @ApiProperty({
    type: EmpDetailsViewSwagger,
    isArray: true,
  })
  result: EmpDetailsView[];
}
