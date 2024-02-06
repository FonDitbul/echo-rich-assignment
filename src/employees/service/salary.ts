export class Salary {
  salary: number;
  readonly maxSalary: number;
  readonly minSalary: number;
  calculateSalary: number;

  constructor(salary: number, maxSalary: number, minSalary: number) {
    this.salary = salary;
    this.maxSalary = maxSalary;
    this.minSalary = minSalary;
  }

  overThanMax() {
    if (this.salary > this.maxSalary) {
      this.salary = this.maxSalary;
    }
    return this.salary;
  }

  lessThanMin() {
    if (this.salary < this.minSalary) {
      this.salary = this.minSalary;
    }
    return this.salary;
  }

  increasePct(increasePct: number) {
    if (increasePct <= 0 || increasePct > 100) {
      throw new Error('increasePct must be 0 ~ 100 percent');
    }
    this.salary += (this.salary * increasePct) / 100;

    return this.salary;
  }
}
