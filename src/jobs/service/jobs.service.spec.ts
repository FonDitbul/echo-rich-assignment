import { Test, TestingModule } from '@nestjs/testing';
import { JobHistoryRepository } from '../repository/jobHistory.repository';
import { JobsService } from './jobs.service';
import { JobHistory } from '@prisma/client';

const MockingJobHistoryRepository = {
  findAllByEmployeeId: jest.fn(),
};
describe('Jobs Service test', () => {
  let jobHistoryRepository;
  let sut;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: JobHistoryRepository,
          useValue: MockingJobHistoryRepository,
        },
        JobsService,
      ],
    }).compile();

    jobHistoryRepository =
      module.get<JobHistoryRepository>(JobHistoryRepository);
    sut = module.get<JobsService>(JobsService);
  });

  describe('특정 사원 이력 정보 조회 기능', () => {
    it('employeeId를 통해 이력 정보 조회가 성공한 경우', async () => {
      const givenJobHistoryList: JobHistory[] = [
        {
          employeeId: 101,
          startDate: new Date('1989-09-21'),
          endDate: new Date('1993-10-27'),
          jobId: 'AC_ACCOUNT',
          departmentId: 110,
        },
      ];
      jobHistoryRepository.findAllByEmployeeId.mockResolvedValue(
        givenJobHistoryList,
      );
      const result = await sut.findAllHistoryOfEmployee(100);

      expect(result).toHaveLength(1);
    });
  });
});
