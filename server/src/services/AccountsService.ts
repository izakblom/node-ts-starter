import { Account } from "../models/Account";
import { IAccountsRepository } from "../repositories/AccountsRepository";

export class AccountsService implements IAccountsService {
  constructor(private readonly accountsRepository: IAccountsRepository) {}

  async Create(
    data: Omit<Account, "id" | "updated" | "created">
  ): Promise<Account> {
    console.debug("AccountsService", "Creating Account", data);
    const account = await this.accountsRepository.Create(data);
    console.debug("AccountsService", "Created Account", account);
    return account;
  }
}

export interface IAccountsService {
  Create(data: Omit<Account, "id" | "updated" | "created">): Promise<Account>;
}
