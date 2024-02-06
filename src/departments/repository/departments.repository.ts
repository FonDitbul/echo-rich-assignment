import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../repository/prisma.service';
import { Prisma } from '@prisma/client';

export type DepartmentsWithLocation = Prisma.DepartmentsGetPayload<{
  include: {
    Locations: {
      include: {
        Countries: {
          include: {
            Regions: true;
          };
        };
      };
    };
  };
}>;

@Injectable()
export class DepartmentsRepository {
  constructor(private prisma: PrismaService) {}

  findAll(lastDepartmentId: number, take: number, searchName?: string) {
    let whereCondition = {};
    if (searchName) {
      whereCondition = {
        departmentName: { contains: searchName, mode: 'insensitive' },
      };
    }

    return this.prisma.departments.findMany({
      where: {
        ...whereCondition,
      },
      include: {
        Locations: {
          include: {
            Countries: {
              include: {
                Regions: true,
              },
            },
          },
        },
      },
      orderBy: { departmentId: 'asc' },
      take: take,
      skip: lastDepartmentId ? 1 : 0,
      ...(lastDepartmentId && {
        cursor: { departmentId: lastDepartmentId },
      }),
    });
  }
}
