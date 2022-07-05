import { Client } from "pg";
import {
  AccountsRepository,
  IAccountsRepository,
} from "../repositories/AccountsRepository";
import { AccountsService, IAccountsService } from "../services/AccountsService";

export function BuildAccountsRepository(
  connection: Client
): IAccountsRepository {
  return new AccountsRepository(connection);
}

export function BuildAccountsService(connection: Client): IAccountsService {
  return new AccountsService(BuildAccountsRepository(connection));
}
