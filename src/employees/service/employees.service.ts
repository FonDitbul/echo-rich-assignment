import { Injectable, NotFoundException } from '@nestjs/common';
import { EmployeesRepository } from '../repository/employees.repository';
import {
  EmployeesUpdateDto,
  EmployeesUpdateManagerDto,
  EmployeesUpdateSalaryByDepartmentId,
} from '../controller/employees.dto';
import { Salary } from './salary';

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

    const salaryObj = new Salary(salary, maxSalary, minSalary);

    salaryObj.overThanMax();
    salaryObj.lessThanMin();

    const copyUpdateDto = {
      ...updateDto,
      salary: salaryObj.salary,
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

  async updateAllIncreaseSalaryByDepartmentId(
    updateDto: EmployeesUpdateSalaryByDepartmentId,
  ) {
    const { departmentId, increasePct } = updateDto;
    // departmentId 를 갖는 모든 사원들 가져오기 With Jobs
    const employeeList =
      await this.employeesRepository.findAllWithJobsByDepartmentId(
        departmentId,
      );

    if (employeeList.length === 0) {
      throw new NotFoundException('There are no employees in that department');
    }

    const updateEmployeeList = employeeList.map((employee) => {
      const salaryObj = new Salary(
        +employee.salary,
        +employee.Jobs.maxSalary,
        +employee.Jobs.minSalary,
      );
      salaryObj.increasePct(increasePct);
      salaryObj.overThanMax();

      return {
        employeeId: employee.employeeId,
        salary: salaryObj.salary,
      };
    });

    await this.employeesRepository.updateAllSalary(updateEmployeeList);
    return;
  }
}
