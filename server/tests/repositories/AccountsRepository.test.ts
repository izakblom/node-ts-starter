import { Account } from "../../src/models/Account";
import { IAccountsRepository } from "../../src/repositories/AccountsRepository";

const mockQuery = jest.fn();
const mockPgClient = {
  query: mockQuery,
};

let sut: IAccountsRepository;

beforeAll(() => {
  jest.mock("pg", () => ({
    Client: mockPgClient,
  }));

  const {
    AccountsRepository,
  } = require("./../../src/repositories/AccountsRepository");

  sut = new AccountsRepository(mockPgClient);
});

describe("Create", () => {
  beforeEach(() => {
    mockQuery.mockResolvedValueOnce({
      rowCount: 1,
      rows: [
        {
          firstname: "firstName",
          lastname: "lastName",
          email: "email",
          id: "id",
          updated: new Date(1, 1, 2021).toISOString(),
          created: new Date(1, 1, 2021).toISOString(),
        },
      ],
    });
  });

  it("Executes the correct SQL", async () => {
    await sut.Create({
      firstName: "firstName",
      lastName: "lastName",
      email: "email",
    });

    expect(mockQuery).toHaveBeenCalledWith(
      [
        "INSERT INTO accounts",
        "(email, firstname, lastname, created, updated)",
        "VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)",
        "RETURNING *",
      ].join(" "),
      ["email", "firstName", "lastName"]
    );
  });

  it("Returns an expected result", async () => {
    const result = await sut.Create({
      firstName: "firstName",
      lastName: "lastName",
      email: "email",
    });

    expect(result).toEqual<Account>({
      firstName: "firstName",
      lastName: "lastName",
      email: "email",
      id: "id",
      updated: new Date(1, 1, 2021),
      created: new Date(1, 1, 2021),
    });
  });
});

describe("Get", () => {
  beforeEach(() => {
    mockQuery.mockResolvedValue({
      rowCount: 1,
      rows: [
        {
          firstname: "firstName",
          lastname: "lastName",
          email: "email",
          id: "id",
          updated: new Date(1, 1, 2021).toISOString(),
          created: new Date(1, 1, 2021).toISOString(),
        },
      ],
    });
  });

  it("Executes the correct SQL", async () => {
    await sut.Get("id");

    expect(mockQuery).toHaveBeenCalledWith(
      "SELECT * from accounts WHERE id = $1",
      ["id"]
    );
  });

  it("Returns an expected result", async () => {
    const result = await sut.Get("id");

    expect(result).toEqual<Account>({
      firstName: "firstName",
      lastName: "lastName",
      email: "email",
      id: "id",
      updated: new Date(1, 1, 2021),
      created: new Date(1, 1, 2021),
    });
  });

  it("Returns undefined if no rows returned", async () => {
    mockQuery.mockResolvedValueOnce({
      rowCount: 0,
      rows: [],
    });
    const result = await sut.Get("id");

    expect(result).toBeUndefined();
  });
});

describe("GetByEmail", () => {
  beforeEach(() => {
    mockQuery.mockResolvedValue({
      rowCount: 1,
      rows: [
        {
          firstname: "firstName",
          lastname: "lastName",
          email: "email",
          id: "id",
          updated: new Date(1, 1, 2021).toISOString(),
          created: new Date(1, 1, 2021).toISOString(),
        },
      ],
    });
  });

  it("Executes the correct SQL", async () => {
    await sut.GetByEmail("email");

    expect(mockQuery).toHaveBeenCalledWith(
      "SELECT * from accounts WHERE email = $1",
      ["email"]
    );
  });

  it("Returns an expected result", async () => {
    const result = await sut.GetByEmail("email");

    expect(result).toEqual<Account>({
      firstName: "firstName",
      lastName: "lastName",
      email: "email",
      id: "id",
      updated: new Date(1, 1, 2021),
      created: new Date(1, 1, 2021),
    });
  });

  it("Returns undefined if no rows returned", async () => {
    mockQuery.mockResolvedValueOnce({
      rowCount: 0,
      rows: [],
    });
    const result = await sut.GetByEmail("email");

    expect(result).toBeUndefined();
  });
});

describe("Update", () => {
  beforeEach(() => {
    mockQuery.mockResolvedValueOnce({
      rowCount: 1,
      rows: [
        {
          firstname: "firstName",
          lastname: "lastName",
          email: "email",
          id: "id",
          updated: new Date(1, 1, 2021).toISOString(),
          created: new Date(1, 1, 2021).toISOString(),
        },
      ],
    });
  });

  it("Executes the correct SQL", async () => {
    await sut.Update({
      firstName: "firstName",
      lastName: "lastName",
      email: "email",
      id: "id",
      updated: new Date(1, 1, 2021),
      created: new Date(1, 1, 2021),
    });

    expect(mockQuery).toHaveBeenCalledWith(
      [
        "UPDATE accounts",
        "SET firstname=$1, lastname=$2, email= $3, updated=CURRENT_TIMESTAMP()",
        "WHERE id = $4",
      ].join(" "),
      ["firstName", "lastName", "email", "id"]
    );
  });

  it("Returns an expected result", async () => {
    const result = await sut.Update({
      firstName: "firstName",
      lastName: "lastName",
      email: "email",
      id: "id",
      updated: new Date(1, 1, 2021),
      created: new Date(1, 1, 2021),
    });

    expect(result).toEqual<Account>({
      firstName: "firstName",
      lastName: "lastName",
      email: "email",
      id: "id",
      updated: new Date(1, 1, 2021),
      created: new Date(1, 1, 2021),
    });
  });
});

describe("Delete", () => {
  it("Executes the correct SQL", async () => {
    await sut.Delete("id");

    expect(mockQuery).toHaveBeenCalledWith("DELETE FROM accounts WHERE id=$1", [
      "id",
    ]);
  });
});
