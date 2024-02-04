import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../repository/prisma.service';

@Injectable()
export class EmployeesRepository {
  constructor(private prisma: PrismaService) {}

  findAll(lastEmployeeId: number, take: number) {
    return this.prisma.employees.findMany({
      orderBy: [{ employeeId: 'asc' }],
      take: take,
      skip: lastEmployeeId ? 1 : 0,
      ...(lastEmployeeId && { cursor: { employeeId: lastEmployeeId } }),
    });
  }

  findOneByEmployeeId(employeeId: number) {
    return this.prisma.employees.findFirstOrThrow({
      where: {
        employeeId,
      },
    });
  }
}
