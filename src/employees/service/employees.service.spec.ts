import { EmployeesService } from './employees.service';
import { EmployeesRepository } from '../repository/employees.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { EmpDetailsView, Employees, Prisma } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';

const MockingEmployeesRepository = {
  findAll: jest.fn(),
  findOneDetailByEmployeeId: jest.fn(),
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

  describe('전체 사원 조회 기능', () => {
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
  describe('특정 사원의 현재 정보 조회 기능', () => {
    it('id를 통해 특정 사원의 정보 조회가 성공한 경우', async () => {
      const givenEmployee: EmpDetailsView = {
        employeeId: 101,
        jobId: 'AD_VP',
        managerId: 100,
        departmentId: 90,
        locationId: 1700,
        countryId: 'US',
        firstName: 'Neena',
        lastName: 'Kochhar',
        salary: new Prisma.Decimal(17000),
        commissionPct: null,
        departmentName: 'Executive',
        jobTitle: 'Administration Vice President',
        city: 'Seattle',
        stateProvince: 'Washington',
        countryName: 'United States of America',
        regionName: 'Americas',
      };
      employeesRepository.findOneDetailByEmployeeId.mockResolvedValue(
        givenEmployee,
      );

      const result = await sut.findOneDetail(101);

      expect(result).toEqual(givenEmployee);
    });

    it('id를 통한 사원 정보가 존재하지 않는 경우 에러', async () => {
      employeesRepository.findOneDetailByEmployeeId.mockResolvedValue(null);

      await expect(async () => {
        await sut.findOneDetail(101);
      }).rejects.toThrowError(new NotFoundException('The data does not exist'));
    });
  });
});
