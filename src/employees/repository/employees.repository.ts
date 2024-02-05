import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../repository/prisma.service';
import { EmployeesUpdateDto } from '../controller/employees.dto';
import { Prisma } from '@prisma/client';

export type EmployeeWithJobs = Prisma.EmployeesGetPayload<{
  include: { Jobs: true };
}>;

@Injectable()
export class EmployeesRepository {
  constructor(private prisma: PrismaService) {}

  findAll(lastEmployeeId: number, take: number, searchName?: string) {
    let whereCondition = {};
    if (searchName) {
      whereCondition = {
        OR: [
          {
            firstName: { contains: searchName, mode: 'insensitive' },
          },
          {
            lastName: { contains: searchName, mode: 'insensitive' },
          },
          {
            email: { contains: searchName, mode: 'insensitive' },
          },
        ],
      };
    }

    return this.prisma.employees.findMany({
      where: {
        ...whereCondition,
      },
      orderBy: { employeeId: 'asc' },
      take: take,
      skip: lastEmployeeId ? 1 : 0,
      ...(lastEmployeeId && { cursor: { employeeId: lastEmployeeId } }),
    });
  }

  findOneByEmployeeId(employeeId: number) {
    return this.prisma.employees.findFirst({
      where: {
        employeeId,
      },
    });
  }

  findOneDetailByEmployeeId(employeeId: number) {
    return this.prisma.empDetailsView.findFirst({
      where: {
        employeeId,
      },
    });
  }

  findOneWithJobsByEmployeeId(employeeId: number) {
    return this.prisma.employees.findFirst({
      where: {
        employeeId,
      },
      include: {
        Jobs: true,
      },
    });
  }

  async update(updateDto: EmployeesUpdateDto) {
    const {
      employeeId,
      firstName,
      lastName,
      email,
      phoneNumber,
      salary,
      commissionPct,
    } = updateDto;

    await this.prisma.employees.update({
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        salary,
        commissionPct,
      },
      where: {
        employeeId,
      },
    });

    return;
  }

  async updateManager(employeeId: number, managerId: number | null) {
    await this.prisma.employees.update({
      data: {
        managerId,
      },
      where: {
        employeeId,
      },
    });
    return;
  }
}
