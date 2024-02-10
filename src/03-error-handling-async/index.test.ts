import {
  throwError,
  resolveValue,
  throwCustomError,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const data = await resolveValue(3);

    expect(data).toBe(3);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    function erroredCall() {
      throwError('ogogo');
    }

    expect(erroredCall).toThrow(new Error('ogogo'));
  });

  test('should throw error with default message if message is not provided', () => {
    function erroredCall() {
      throwError();
    }

    expect(erroredCall).toThrow(new Error('Oops!'));
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    function erroredCall() {
      throwCustomError();
    }

    expect(erroredCall).toThrow(new MyAwesomeError());
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(new MyAwesomeError());
  });
});
