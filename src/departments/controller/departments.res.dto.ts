import { Departments } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

class DepartmentSwagger implements Departments {
  @ApiProperty({
    type: Number,
  })
  departmentId: number;

  @ApiProperty({
    type: String,
  })
  departmentName: string;

  @ApiProperty({
    type: Number,
    nullable: true,
  })
  locationId: number | null;

  @ApiProperty({
    type: Number,
    nullable: true,
  })
  managerId: number | null;
}

export class DepartmentsFindAllResDto {
  @ApiProperty({
    type: DepartmentSwagger,
    isArray: true,
  })
  result: Departments[];
}
