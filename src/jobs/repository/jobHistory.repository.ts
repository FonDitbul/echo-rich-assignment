import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../repository/prisma.service';

@Injectable()
export class JobHistoryRepository {
  constructor(private prisma: PrismaService) {}

  findAllByEmployeeId(employeeId: number) {
    return this.prisma.jobHistory.findMany({
      where: {
        employeeId,
      },
    });
  }
}
