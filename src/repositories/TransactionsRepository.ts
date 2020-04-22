import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance =
      this.transactions.length &&
      this.transactions.reduce((acc: any, obj) => {
        const key: 'income' | 'outcome' = obj.type;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
      }, {});

    const income =
      (balance?.income?.length &&
        balance.income.reduce((acc: any, prev: any) => acc + prev.value, 0)) ||
      0;

    const outcome =
      (balance?.outcome?.length &&
        balance.outcome.reduce((acc: any, prev: any) => acc + prev.value, 0)) ||
      0;

    return { income, outcome, total: income - outcome };
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
