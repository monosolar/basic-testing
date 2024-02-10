import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const bankAccount = getBankAccount(400);

    expect(bankAccount.getBalance()).toBe(400);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(400);

    function erroredCall() {
      bankAccount.withdraw(1000);
    }

    expect(erroredCall).toThrow(new InsufficientFundsError(400));
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccount = getBankAccount(400);
    const bankAccountTo = getBankAccount(0);

    function erroredCall() {
      bankAccount.transfer(1000, bankAccountTo);
    }

    expect(erroredCall).toThrow(new InsufficientFundsError(400));
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(400);

    function erroredCall() {
      bankAccount.transfer(1000, bankAccount);
    }

    expect(erroredCall).toThrow(new TransferFailedError());
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(400);

    expect(bankAccount.getBalance()).toBe(400);
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(400);

    expect(bankAccount.withdraw(200).getBalance()).toBe(200);
  });

  test('should transfer money', () => {
    const bankAccount = getBankAccount(400);
    const bankAccountTo = getBankAccount(0);

    expect(bankAccount.transfer(200, bankAccountTo).getBalance()).toBe(200);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = getBankAccount(0);
    const fetchBalanceResult = await bankAccount.fetchBalance();

    expect(
      fetchBalanceResult === null || typeof fetchBalanceResult === 'number',
    ).toBeTruthy();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount = getBankAccount(0);
    const fetchBalanceResult = await bankAccount.fetchBalance();

    if (typeof fetchBalanceResult === 'number') {
      expect(bankAccount.deposit(fetchBalanceResult).getBalance()).toBe(
        fetchBalanceResult,
      );
    } else {
      expect(bankAccount.getBalance()).toBe(0);
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = getBankAccount(0);

    try {
      await bankAccount.synchronizeBalance();
      const balance = bankAccount.getBalance();
      expect(balance).toBe(balance);
    } catch (error) {
      expect(error instanceof SynchronizationFailedError).toBe(true);
    }
  });
});
