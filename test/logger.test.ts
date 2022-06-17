import { useLogger } from '../src';
import { LoggerFactory } from '../src/logger';
import Mock = jest.Mock;


let mockLogger: Mock;

beforeEach(() => {
  jest.mock('../src/logger');
  mockLogger = jest.fn();
  LoggerFactory.getInstance = jest.fn().mockReturnValue({
    log: mockLogger,
  });
});
afterEach(() => {
  mockLogger.mockReset();
});

describe('Logs async things', () => {
  test('Logs async things', async () => {
    async function add(one: number, two: number) {
      return one + two;
    }

    await useLogger(add)(4, 5);

    expect(mockLogger.mock.calls[0]).toMatchSnapshot();
    expect(mockLogger.mock.calls[1]).toMatchSnapshot();
  });

  test('Logs async objects', async () => {
    async function add(one: number, two: number) {
      return { result: one + two };
    }

    await useLogger(add)(4, 5);

    expect(mockLogger.mock.calls[0]).toMatchSnapshot();
    expect(mockLogger.mock.calls[1]).toMatchSnapshot();
  });

});

describe('Logs sync things', () => {
  test('Logs things', () => {

    function add(one: number, two: number) {
      return one + two;
    }

    useLogger(add)(3, 4);

    expect(mockLogger.mock.calls[0]).toMatchSnapshot();
    expect(mockLogger.mock.calls[1]).toMatchSnapshot();
  });
  test('Logs things that are objects', () => {

    function add(one: number, two: number) {
      return { results: one + two };
    }

    useLogger(add)(3, 4);

    expect(mockLogger.mock.calls[0]).toMatchSnapshot();
    expect(mockLogger.mock.calls[1]).toMatchSnapshot();
  });

});

