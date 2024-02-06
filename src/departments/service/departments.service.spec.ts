import { Test, TestingModule } from '@nestjs/testing';
import {
  DepartmentsRepository,
  DepartmentsWithLocation,
} from '../repository/departments.repository';
import { DepartmentsService } from './departments.service';

const MockingDepartmentsRepository = {
  findAll: jest.fn(),
  findOneByEmployeeId: jest.fn(),
  findOneDetailByEmployeeId: jest.fn(),
  findOneWithJobsByEmployeeId: jest.fn(),
  update: jest.fn(),
  updateManager: jest.fn(),
};

describe('Departments Service test', () => {
  let departmentsRepository;
  let sut;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: DepartmentsRepository,
          useValue: MockingDepartmentsRepository,
        },
        DepartmentsService,
      ],
    }).compile();

    departmentsRepository = module.get<DepartmentsRepository>(
      DepartmentsRepository,
    );
    sut = module.get<DepartmentsService>(DepartmentsService);
  });

  describe('전체 부서 및 위치 조회 기능', () => {
    it('전체 부서 및 위치 조회가 성공한 경우', async () => {
      const givenDepartments: DepartmentsWithLocation[] = [
        {
          departmentId: 30,
          departmentName: 'Purchasing',
          managerId: 114,
          locationId: 1700,
          Locations: {
            locationId: 1700,
            streetAddress: '2004 Charade Rd',
            postalCode: '98199',
            city: 'Seattle',
            stateProvince: 'Washington',
            countryId: 'US',
            Countries: {
              countryId: 'US',
              countryName: 'United States of America',
              regionId: 2,
              Regions: {
                regionId: 2,
                regionName: 'Americas',
              },
            },
          },
        },
        {
          departmentId: 40,
          departmentName: 'Human Resources',
          managerId: 203,
          locationId: 2400,
          Locations: {
            locationId: 2400,
            streetAddress: '8204 Arthur St',
            postalCode: null,
            city: 'London',
            stateProvince: null,
            countryId: 'UK',
            Countries: {
              countryId: 'UK',
              countryName: 'United Kingdom',
              regionId: 1,
              Regions: {
                regionId: 1,
                regionName: 'Europe',
              },
            },
          },
        },
      ];
      departmentsRepository.findAll.mockResolvedValue(givenDepartments);

      const result = await sut.findAll();

      expect(result).toHaveLength(2);
    });
  });
});
