import { JobHistory } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class JobHistorySwagger implements JobHistory {
  @ApiProperty({
    type: Number,
  })
  employeeId: number;

  @ApiProperty({
    type: Date,
  })
  startDate: Date;

  @ApiProperty({
    type: Date,
  })
  endDate: Date;

  @ApiProperty({
    type: String,
  })
  jobId: string;

  @ApiProperty({
    type: Number,
  })
  departmentId: number;
}
export class JobsFindAllHistoryOfEmployeeResDto {
  @ApiProperty({
    type: JobHistorySwagger,
    isArray: true,
  })
  result: JobHistory[];
}
