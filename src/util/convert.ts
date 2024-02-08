export const snakeToCamel = (str: string): string =>
  str.replace(/([_-][a-z])/gi, ($1: string) =>
    $1.toUpperCase().replace('-', '').replace('_', ''),
  );

export const camelToSnake = (str: string): string =>
  str.replace(/([A-Z])/g, ($1: string) => `_${$1.toLowerCase()}`);

const isArray = function (
  input: Record<string, unknown> | Record<string, unknown>[] | unknown,
): input is Record<string, unknown>[] {
  return Array.isArray(input);
};

export const isObject = function (
  obj: Record<string, unknown> | Record<string, unknown>[] | unknown,
): obj is Record<string, unknown> {
  return (
    isValidDate(obj) === false &&
    obj === Object(obj) &&
    !Array.isArray(obj) &&
    typeof obj !== 'function'
  );
};

const isValidDate = (value: any) => value instanceof Date;

const modifyObjectKeys = function <T>(
  input: T,
  formatter: (word: string) => string,
): T {
  return (function recurse<
    K extends Record<string, unknown> | Record<string, unknown>[] | unknown,
  >(input: K): K {
    if (isObject(input)) {
      return Object.keys(input).reduce(
        (acc, key) =>
          Object.assign(acc, { [formatter(key)]: recurse(input[key]) }),
        {} as K,
      );
    } else if (isArray(input)) {
      return input.map((i) => recurse(i)) as K;
    }
    return input;
  })(input);
};

export const camelize = function <T>(input: T): T {
  return modifyObjectKeys(input, snakeToCamel);
};

export const snakeify = function <T>(input: T): T {
  return modifyObjectKeys(input, camelToSnake);
};
