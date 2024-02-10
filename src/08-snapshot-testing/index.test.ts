import { generateLinkedList } from './index';

const list = generateLinkedList(['one', 'two', 'three']);

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect(list).toStrictEqual({
      value: 'one',
      next: {
        value: 'two',
        next: { value: 'three', next: { next: null, value: null } },
      },
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(list).toMatchSnapshot();
  });
});
