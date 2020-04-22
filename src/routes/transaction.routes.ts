import { Router } from 'express';

import TransactionsController from '../controllers/TransactionController';

const transactionRouter = Router();

transactionRouter.get('/', TransactionsController.list);
transactionRouter.post('/', TransactionsController.store);

export default transactionRouter;
