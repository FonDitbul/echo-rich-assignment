import { EmployeesService } from './employees.service';
import { EmployeesRepository } from '../repository/employees.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { Employees, Prisma } from '@prisma/client';

const MockingEmployeesRepository = {
  findAll: jest.fn(),
};

describe('Employees Service test', () => {
  let employeesRepository;
  let sut;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: EmployeesRepository,
          useValue: MockingEmployeesRepository,
        },
        EmployeesService,
      ],
    }).compile();

    employeesRepository = module.get<EmployeesRepository>(EmployeesRepository);
    sut = module.get<EmployeesService>(EmployeesService);
  });

  describe('전체 사원 조회 여부', () => {
    it('전체 사원 조회가 성공한 경우', async () => {
      const givenEmployees: Employees[] = [
        {
          employeeId: 106,
          firstName: 'Valli',
          lastName: 'Pataballa',
          email: 'VPATABAL',
          phoneNumber: '590.423.4560',
          hireDate: new Date('1998-02-05'),
          jobId: 'IT_PROG',
          salary: new Prisma.Decimal(4800),
          commissionPct: null,
          managerId: 103,
          departmentId: 60,
        },
        {
          employeeId: 107,
          firstName: 'Diana',
          lastName: 'Lorentz',
          email: 'DLORENTZ',
          phoneNumber: '590.423.5567',
          hireDate: new Date('1999-02-07'),
          jobId: 'IT_PROG',
          salary: new Prisma.Decimal(4200),
          commissionPct: null,
          managerId: 103,
          departmentId: 60,
        },
      ];
      employeesRepository.findAll.mockResolvedValue(givenEmployees);

      const result = await sut.findAll(0, 2);

      expect(result).toHaveLength(2);
    });
  });
});
