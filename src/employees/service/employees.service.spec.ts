import { EmployeesService } from './employees.service';
import {
  EmployeesRepository,
  EmployeeWithJobs,
} from '../repository/employees.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { EmpDetailsView, Employees, Prisma } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';
import {
  EmployeesUpdateDto,
  EmployeesUpdateManagerDto,
} from '../controller/employees.dto';

const MockingEmployeesRepository = {
  findAll: jest.fn(),
  findOneByEmployeeId: jest.fn(),
  findOneDetailByEmployeeId: jest.fn(),
  findOneWithJobsByEmployeeId: jest.fn(),
  update: jest.fn(),
  updateManager: jest.fn(),
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

  describe('특정 사원의 정보 업데이트 기능', () => {
    it('해당 employeeId의 사원이 존재하며 업데이트에 성공한 경우', async () => {
      const givenUpdateDto: EmployeesUpdateDto = {
        employeeId: 100,
        firstName: 'test',
        lastName: 'test',
        email: 'test',
        phoneNumber: '5512515',
        salary: 35000,
        commissionPct: null,
      };
      const givenEmployee: EmployeeWithJobs = {
        commissionPct: undefined,
        departmentId: 0,
        email: '',
        employeeId: 0,
        firstName: '',
        hireDate: undefined,
        jobId: '',
        lastName: '',
        managerId: 0,
        phoneNumber: '',
        salary: undefined,
        Jobs: {
          jobId: 'AD_PRES',
          jobTitle: 'President',
          minSalary: new Prisma.Decimal(20000),
          maxSalary: new Prisma.Decimal(40000),
        },
      };
      employeesRepository.findOneWithJobsByEmployeeId.mockResolvedValue(
        givenEmployee,
      );

      await sut.update(givenUpdateDto);

      expect(employeesRepository.update).toHaveBeenCalledWith(givenUpdateDto);
    });
    it('해당 employeeId의 사원이 존재하지 않아 에러가 발생한 경우', async () => {
      const givenUpdateDto: EmployeesUpdateDto = {
        employeeId: 100,
        firstName: 'test',
        lastName: 'test',
        email: 'test',
        phoneNumber: '5512515',
        salary: 35000,
        commissionPct: null,
      };

      employeesRepository.findOneWithJobsByEmployeeId.mockResolvedValue(null);

      await expect(async () => {
        await sut.update(givenUpdateDto);
      }).rejects.toThrowError(new NotFoundException('The data does not exist'));
    });
    it('해당 employeeId의 사원이 존재하며 최저 급여보다 적게 입력한 경우 최저 급여로 적용', async () => {
      const givenUpdateDto: EmployeesUpdateDto = {
        employeeId: 100,
        firstName: 'test',
        lastName: 'test',
        email: 'test',
        phoneNumber: '5512515',
        salary: 1500,
        commissionPct: null,
      };
      const givenEmployee: EmployeeWithJobs = {
        commissionPct: undefined,
        departmentId: 0,
        email: '',
        employeeId: 0,
        firstName: '',
        hireDate: undefined,
        jobId: '',
        lastName: '',
        managerId: 0,
        phoneNumber: '',
        salary: undefined,
        Jobs: {
          jobId: 'AD_PRES',
          jobTitle: 'President',
          minSalary: new Prisma.Decimal(20000),
          maxSalary: new Prisma.Decimal(40000),
        },
      };
      employeesRepository.findOneWithJobsByEmployeeId.mockResolvedValue(
        givenEmployee,
      );

      await sut.update(givenUpdateDto);

      expect(employeesRepository.update).toHaveBeenCalledWith({
        ...givenUpdateDto,
        salary: 20000,
      });
    });
    it('해당 employeeId의 사원이 존재하며 최대 급여보다 많게 입력한 경우 최대 급여로 적용', async () => {
      const givenUpdateDto: EmployeesUpdateDto = {
        employeeId: 100,
        firstName: 'test',
        lastName: 'test',
        email: 'test',
        phoneNumber: '5512515',
        salary: 50000,
        commissionPct: null,
      };
      const givenEmployee: EmployeeWithJobs = {
        commissionPct: undefined,
        departmentId: 0,
        email: '',
        employeeId: 0,
        firstName: '',
        hireDate: undefined,
        jobId: '',
        lastName: '',
        managerId: 0,
        phoneNumber: '',
        salary: undefined,
        Jobs: {
          jobId: 'AD_PRES',
          jobTitle: 'President',
          minSalary: new Prisma.Decimal(20000),
          maxSalary: new Prisma.Decimal(40000),
        },
      };
      employeesRepository.findOneWithJobsByEmployeeId.mockResolvedValue(
        givenEmployee,
      );

      await sut.update(givenUpdateDto);

      expect(employeesRepository.update).toHaveBeenCalledWith({
        ...givenUpdateDto,
        salary: 40000,
      });
    });
  });

  describe('특정 사원의 정보 매니저 변경 기능', () => {
    it('employeeId와 managerId를 입력받아 매니저 변경에 성공한 경우', async () => {
      const givenDto: EmployeesUpdateManagerDto = {
        employeeId: 100,
        managerId: 10,
      };
      const givenManager: Employees = {
        commissionPct: undefined,
        departmentId: 0,
        email: '',
        employeeId: 0,
        firstName: '',
        hireDate: undefined,
        jobId: '',
        lastName: '',
        managerId: 10,
        phoneNumber: '',
        salary: undefined,
      };
      employeesRepository.findOneByEmployeeId.mockResolvedValue(givenManager);

      await sut.updateManager(givenDto);

      expect(employeesRepository.updateManager).toHaveBeenCalledWith(100, 10);
    });

    it('employeeId와 managerId를 null 로 변경에 성공한 경우', async () => {
      const givenDto: EmployeesUpdateManagerDto = {
        employeeId: 100,
      };

      await sut.updateManager(givenDto);

      expect(employeesRepository.updateManager).toHaveBeenCalledWith(100, null);
    });

    it('managerId를 통한 manager 정보가 존재하지 않는 경우 에러', async () => {
      const givenDto: EmployeesUpdateManagerDto = {
        employeeId: 100,
        managerId: 10,
      };

      employeesRepository.findOneByEmployeeId.mockResolvedValue(null);

      await expect(async () => {
        await sut.updateManager(givenDto);
      }).rejects.toThrowError(new NotFoundException('manager does not exist'));
    });
  });
});
