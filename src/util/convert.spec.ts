import { camelize, camelToSnake, snakeify, snakeToCamel } from './convert';

describe('convert test', function () {
  describe('snakeToCamel 함수 테스트', () => {
    it('소문자 snake case to camel 케이스 테스트', function () {
      const actual = snakeToCamel('test_case');
      expect(actual).toEqual('testCase');
    });
  });

  describe('camelToSnake 함수 테스트', () => {
    it('카멜 케이스를 snake로 변경', function () {
      const actual = camelToSnake('testCase');
      expect(actual).toEqual('test_case');
    });
  });

  describe('camelize 함수 테스트', () => {
    it('snake 케이스 object 를 camel case object로 변경', function () {
      const snakeObject = {
        test_case: 'testest',
        object: {
          test_name: 'test',
          test_code: 'tete',
        },
      };
      const actual = camelize(snakeObject);
      expect(actual).toEqual({
        testCase: 'testest',
        object: {
          testName: 'test',
          testCode: 'tete',
        },
      });
    });
  });

  describe('snakeify 함수 테스트', () => {
    it('camel 케이스 object 를 snake case object로 변경', function () {
      const camelObject = {
        testCase: 'testest',
        object: {
          testName: 'test',
          testCode: 'tete',
        },
      };
      const actual = snakeify(camelObject);
      expect(actual).toEqual({
        test_case: 'testest',
        object: {
          test_name: 'test',
          test_code: 'tete',
        },
      });
    });
  });
});
