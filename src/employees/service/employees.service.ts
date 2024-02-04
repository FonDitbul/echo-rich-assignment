import { Injectable, NotFoundException } from '@nestjs/common';
import { EmployeesRepository } from '../repository/employees.repository';

@Injectable()
export class EmployeesService {
  constructor(private employeesRepository: EmployeesRepository) {}

  async findAll(lastEmployeeId: number, take: number) {
    const employeeList = await this.employeesRepository.findAll(
      lastEmployeeId,
      take,
    );

    return employeeList;
  }

  async findOneDetail(employeeId: number) {
    const employee =
      await this.employeesRepository.findOneDetailByEmployeeId(employeeId);

    if (!employee) {
      throw new NotFoundException('The data does not exist');
    }
    return employee;
  }
}
