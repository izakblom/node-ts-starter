import { Account } from "../models/Account";
import { IRepositoryBase } from "./IRepositoryBase";
import { Client } from "pg";

export class AccountsRepository implements IAccountsRepository {
  constructor(private readonly connection: Client) {}

  private MapRowToAccount(row: AccountRow): Account {
    return {
      firstName: row.firstname,
      lastName: row.lastname,
      email: row.email,
      id: row.id,
      updated: new Date(row.updated),
      created: new Date(row.created),
    };
  }

  async Get(id: string): Promise<Account | undefined> {
    const res = await this.connection.query(
      "SELECT * from accounts WHERE id = $1",
      [id]
    );
    if (res.rowCount === 1) {
      return this.MapRowToAccount(res.rows[0]);
    }
  }

  async GetByEmail(email: string): Promise<Account | undefined> {
    const res = await this.connection.query(
      "SELECT * from accounts WHERE email = $1",
      [email]
    );
    if (res.rowCount > 0) {
      return this.MapRowToAccount(res.rows[0]);
    }
  }

  async Create(
    data: Omit<Account, "id" | "updated" | "created">
  ): Promise<Account> {
    const res = await this.connection.query(
      [
        "INSERT INTO accounts",
        "(email, firstname, lastname, created, updated)",
        "VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)",
        "RETURNING *",
      ].join(" "),
      [data.email, data.firstName, data.lastName]
    );

    return this.MapRowToAccount(res.rows[0]);
  }

  async Update(params: Account): Promise<Account> {
    const res = await this.connection.query(
      [
        "UPDATE accounts",
        "SET firstname=$1, lastname=$2, email= $3, updated=CURRENT_TIMESTAMP()",
        "WHERE id = $4",
      ].join(" "),
      [params.firstName, params.lastName, params.email, params.id]
    );
    return this.MapRowToAccount(res.rows[0]);
  }

  async Delete(id: string): Promise<void> {
    await this.connection.query("DELETE FROM accounts WHERE id=$1", [id]);
  }
}

export interface IAccountsRepository extends IRepositoryBase<Account> {
  GetByEmail(email: string): Promise<Account | undefined>;
}

type AccountRow = {
  firstname: string;
  lastname: string;
  email: string;
  id: string;
  created: string;
  updated: string;
};
