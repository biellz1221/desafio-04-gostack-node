import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  type: 'income' | 'outcome';
  title: string;
  value: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ type, title, value }: Request): Transaction {
    if (type !== 'income' && type !== 'outcome') {
      throw Error('Transaction type must be "income" or "outcome"');
    }
    const transaction = this.transactionsRepository.create({
      type,
      title,
      value,
    });
    return transaction;
  }
}

export default CreateTransactionService;
