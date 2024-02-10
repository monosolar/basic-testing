import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
];

describe('simpleCalculator', () => {
  it.each(testCases)(
    'Test %s',
    ({ a, b, action, expected }: (typeof testCases)[0]) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
