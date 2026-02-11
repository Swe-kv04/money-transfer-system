import { TransactionHistory } from '../enums/transfer-history.enum';

export interface Transaction {
 
  id: string;
  fromAccountId: number;
  toAccountId: number;
  amount: string;
  status: TransactionHistory;
  failureReason?: string | null;
  idempotencyKey: string;
  createdOn: string;
}