import { Injectable } from '@nestjs/common';
import { DepartmentsRepository } from '../repository/departments.repository';

@Injectable()
export class DepartmentsService {
  constructor(private departmentsRepository: DepartmentsRepository) {}

  async findAll(lastDepartmentId: number, take: number, searchName?: string) {
    const departmentsList = await this.departmentsRepository.findAll(
      lastDepartmentId,
      take,
      searchName,
    );

    return departmentsList;
  }
}
