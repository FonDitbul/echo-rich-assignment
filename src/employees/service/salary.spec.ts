import { Salary } from './salary';

describe('Salary class Test', () => {
  describe('overThanMax method test', () => {
    it('overThanMax 급여가 최고 급여보다 높을 경우 최고 급여 반환', () => {
      const salaryObj = new Salary(5000, 4000, 1000);

      const result = salaryObj.overThanMax();

      expect(result).toEqual(4000);
    });
    it('overThanMax 급여가 최고 급여보다 낮을 경우 기존 급여 반환', () => {
      const salaryObj = new Salary(3000, 4000, 1000);

      const result = salaryObj.overThanMax();

      expect(result).toEqual(3000);
    });
  });

  describe('lessThanMin method test', () => {
    it('lessThanMin 급여가 최저 급여보다 높을 경우 기존 급여 반환', () => {
      const salaryObj = new Salary(3000, 4000, 1000);

      const result = salaryObj.lessThanMin();

      expect(result).toEqual(3000);
    });
    it('lessThanMin 급여가 최저 급여보다 낮을 경우 최저 급여 반환', () => {
      const salaryObj = new Salary(500, 4000, 1000);

      const result = salaryObj.lessThanMin();

      expect(result).toEqual(1000);
    });
  });

  describe('increasePct method test', () => {
    it('급여 2000 인상 비율이 10인 경우 2200 반환', () => {
      const salaryObj = new Salary(2000, 4000, 1000);

      const result = salaryObj.increasePct(10);

      expect(result).toEqual(2200);
      expect(salaryObj.salary).toEqual(2200);
    });

    it('급여 2000 인상 비율이 100인 경우 4000', () => {
      const salaryObj = new Salary(2000, 4000, 1000);

      const result = salaryObj.increasePct(100);

      expect(result).toEqual(4000);
      expect(salaryObj.salary).toEqual(4000);
    });

    it('increasePct 가 0이 들어온 경우 에러', () => {
      const salaryObj = new Salary(2000, 4000, 1000);

      expect(() => {
        salaryObj.increasePct(0);
      }).toThrowError(new Error('increasePct must be 0 ~ 100 percent'));
    });

    it('increasePct 가 -1이 들어온 경우 에러', () => {
      const salaryObj = new Salary(2000, 4000, 1000);

      expect(() => {
        salaryObj.increasePct(-1);
      }).toThrowError(new Error('increasePct must be 0 ~ 100 percent'));
    });

    it('increasePct 가 100 이상이 들어온 경우 에러', () => {
      const salaryObj = new Salary(2000, 4000, 1000);

      expect(() => {
        salaryObj.increasePct(101);
      }).toThrowError(new Error('increasePct must be 0 ~ 100 percent'));
    });
  });
});
