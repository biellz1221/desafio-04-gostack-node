import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  type: 'income' | 'outcome';
  value: number;
  title: string;
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
    const balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    this.transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        balance.income += transaction.value;
      } else {
        balance.outcome += transaction.value;
      }
      balance.total = balance.income - balance.outcome;
    });

    return balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    const balance = this.getBalance();
    if (type === 'outcome' && balance.total - value < 0) {
      throw Error("Can't spend more than you have");
    }
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
