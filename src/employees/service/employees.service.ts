import { Injectable, NotFoundException } from '@nestjs/common';
import { EmployeesRepository } from '../repository/employees.repository';
import {
  EmployeesUpdateDto,
  EmployeesUpdateManagerDto,
} from '../controller/employees.dto';

@Injectable()
export class EmployeesService {
  constructor(private employeesRepository: EmployeesRepository) {}

  async findAll(lastEmployeeId: number, take: number, searchName?: string) {
    const employeeList = await this.employeesRepository.findAll(
      lastEmployeeId,
      take,
      searchName,
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

  async update(updateDto: EmployeesUpdateDto) {
    const { employeeId, salary } = updateDto;

    const employee =
      await this.employeesRepository.findOneWithJobsByEmployeeId(employeeId);
    if (!employee) {
      throw new NotFoundException('The data does not exist');
    }

    const maxSalary: number = +employee.Jobs.maxSalary;
    const minSalary: number = +employee.Jobs.minSalary;

    let applySalary = salary;
    if (salary > maxSalary) {
      applySalary = maxSalary;
    }
    if (salary < minSalary) {
      applySalary = minSalary;
    }

    const copyUpdateDto = {
      ...updateDto,
      salary: applySalary,
    };

    await this.employeesRepository.update(copyUpdateDto);
    return;
  }

  async updateManager(updateDto: EmployeesUpdateManagerDto) {
    const employeeId = updateDto.employeeId;
    const managerId: number | null = updateDto.managerId
      ? updateDto.managerId
      : null;

    if (managerId) {
      const manager =
        await this.employeesRepository.findOneByEmployeeId(managerId);

      if (!manager) {
        throw new NotFoundException('manager does not exist');
      }
    }

    await this.employeesRepository.updateManager(employeeId, managerId);
  }
}
