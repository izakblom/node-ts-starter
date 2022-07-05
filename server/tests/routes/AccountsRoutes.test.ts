import supertest from "supertest";
import { GetAccountResponse } from "../../src/contracts/GetAccountResponse";
import { PostAccountRequest } from "../../src/contracts/PostAccountRequest";
import { PostAccountResponse } from "../../src/contracts/PostAccountResponse";
import { Account } from "../../src/models/Account";

import {
  buildMockAccountsRepository,
  buildMockAccountsService,
  getMockConfig,
} from "../mocks";

const mockAccountsRepository = buildMockAccountsRepository();
const mockAccountsService = buildMockAccountsService();

const mockMigrateDatabase = jest.fn();

let app: Express.Application;

beforeAll(() => {
  jest.mock("./../../src/config.ts", () => ({
    GetConfig: jest.fn(() => getMockConfig()),
  }));

  jest.mock("./../../src/repositories/AccountsRepository.ts", () => ({
    AccountsRepository: jest.fn(() => mockAccountsRepository),
  }));

  jest.mock("./../../src/services/AccountsService.ts", () => ({
    AccountsService: jest.fn(() => mockAccountsService),
  }));

  jest.mock("./../../src/database/migrations/MigrateDatabase.ts", () => ({
    MigrateDatabase: mockMigrateDatabase,
  }));

  jest.mock("./../../src/database/WithConnection.ts", () => ({
    WithConnectionAsync: jest.fn(async (callback) => {
      await callback();
    }),
  }));

  jest.spyOn(console, "error").mockImplementation();
  jest.spyOn(console, "info").mockImplementation();

  
  const createApp = require("../../src/app").default;

  app = createApp();
});

describe("POST /accounts", () => {
  const exampleRequest: Readonly<PostAccountRequest> = {
    email: "test5@test.com",
    firstName: "John",
    lastName: "Doe",
  };

  const exampleResponse: Readonly<PostAccountResponse> = {
    id: "7",
    created: "2022-07-04T19:18:06.732Z",
    updated: "2022-07-04T19:18:06.732Z",
    email: "test5@test.com",
    firstName: "John",
    lastName: "Doe",
  };

  beforeAll(() => {
    mockAccountsService.Create.mockResolvedValue({
      ...exampleResponse,
      created: new Date(exampleResponse.created),
      updated: new Date(exampleResponse.updated),
    });

    mockAccountsRepository.GetByEmail.mockResolvedValue(undefined);
  });

  it("returns a 201 Accepted response", async () => {
    await supertest(app)
      .post("/accounts")

      .send(exampleRequest)
      .expect(201);
  });

  it("returns content type JSON", async () => {
    await supertest(app)
      .post("/accounts")

      .expect("Content-Type", /json/);
  });

  it("accepts a valid request body and returns a valid response", async () => {
    await supertest(app)
      .post("/accounts")

      .send(exampleRequest)
      .expect(201, exampleResponse);
  });

  it("uses dependencies correctly", async () => {
    await supertest(app)
      .post("/accounts")

      .send(exampleRequest)
      .expect(201, exampleResponse);

    expect(mockAccountsRepository.GetByEmail).toHaveBeenCalledWith(
      exampleRequest.email
    );
    expect(mockAccountsService.Create).toHaveBeenCalledWith(exampleRequest);
  });

  it.each([
    {
      request: {},
      errorMessage:
        '"email" is required. "firstName" is required. "lastName" is required',
    },
    {
      request: { ...exampleRequest, email: undefined },
      errorMessage: '"email" is required',
    },
    {
      request: { ...exampleRequest, email: "" },
      errorMessage: '"email" is not allowed to be empty',
    },
    {
      request: { ...exampleRequest, email: "test" },
      errorMessage: '"email" must be a valid email',
    },
    {
      request: { ...exampleRequest, firstName: undefined },
      errorMessage: '"firstName" is required',
    },
    {
      request: { ...exampleRequest, firstName: "" },
      errorMessage: '"firstName" is not allowed to be empty',
    },
    {
      request: { ...exampleRequest, lastName: undefined },
      errorMessage: '"lastName" is required',
    },
    {
      request: { ...exampleRequest, lastName: "" },
      errorMessage: '"lastName" is not allowed to be empty',
    },
  ])("returns 400 bad request for an invalid request %o", async (testCase) => {
    await supertest(app)
      .post("/accounts")
      .send(testCase.request)
      .expect(400, {
        message: "Invalid Request",
        errors: [
          {
            message: testCase.errorMessage,
          },
        ],
      });
  });

  it("returns 409 response if duplicate account", async () => {
    mockAccountsRepository.GetByEmail.mockResolvedValueOnce({
      id: "7",
    } as Account);
    await supertest(app).post("/accounts").send(exampleRequest).expect(409);
  });

  it("returns 500 response if an internal error occurs", async () => {
    mockAccountsService.Create.mockImplementation(() => {
      throw new Error("boom");
    });
    await supertest(app).post("/accounts").send(exampleRequest).expect(500);
  });
});

describe("GET /accounts", () => {
  const exampleResponse: Readonly<GetAccountResponse> = {
    id: "7",
    created: "2022-07-04T19:18:06.732Z",
    updated: "2022-07-04T19:18:06.732Z",
    email: "test5@test.com",
    firstName: "John",
    lastName: "Doe",
  };

  beforeAll(() => {
    mockAccountsRepository.Get.mockResolvedValue({
      ...exampleResponse,
      created: new Date(exampleResponse.created),
      updated: new Date(exampleResponse.updated),
    });
  });

  it("returns a 200 OK response", async () => {
    await supertest(app)
      .get("/accounts/account-id")

      .expect(200);
  });

  it("returns content type JSON", async () => {
    await supertest(app)
      .get("/accounts/account-id")

      .expect("Content-Type", /json/);
  });

  it("returns a valid response", async () => {
    await supertest(app)
      .get("/accounts/account-id")

      .expect(200, exampleResponse);
  });

  it("returns 404 not found if account not found", async () => {
    mockAccountsRepository.Get.mockResolvedValue(undefined);
    await supertest(app)
      .get("/accounts/account-id")

      .expect(404);
  });

  it("returns 500 response if an internal error occurs", async () => {
    mockAccountsRepository.Get.mockImplementation(() => {
      throw new Error("boom");
    });
    await supertest(app)
      .get("/accounts/account-id")

      .expect(500);
  });
});
