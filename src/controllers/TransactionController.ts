import { Request, Response } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionsRepository = new TransactionsRepository();

class TransactionsController {
  public async list(_: Request, response: Response): Promise<Response> {
    try {
      const transactions = transactionsRepository.all();
      const balance = transactionsRepository.getBalance();
      return response.status(200).json({ transactions, balance });
    } catch (error) {
      return response.status(400).json();
    }
  }

  public async store(request: Request, response: Response): Promise<Response> {
    try {
      const { title, value, type } = request.body;

      const createTransaction = new CreateTransactionService(
        transactionsRepository,
      );

      const transaction = createTransaction.execute({ title, value, type });

      return response.status(200).json(transaction);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export default new TransactionsController();
