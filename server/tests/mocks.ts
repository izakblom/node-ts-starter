import { IConfig } from "../src/config";
import { IAccountsRepository } from "../src/repositories/AccountsRepository";
import { IAccountsService } from "../src/services/AccountsService";

export const buildMockAccountsRepository: () => jest.Mocked<IAccountsRepository> =
  () => ({
    Create: jest.fn(),
    Delete: jest.fn(),
    Get: jest.fn(),
    Update: jest.fn(),
    GetByEmail: jest.fn(),
  });

export const buildMockAccountsService: () => jest.Mocked<IAccountsService> =
  () => ({
    Create: jest.fn(),
  });

export const getMockConfig = (): IConfig => ({
  DATABASE_NAME: "",
  DATABASE_USER: "",
  DATABASE_PASSWORD: "",
  DATABASE_HOST: "",
  DATABASE_PORT: 3000,
  PORT: 3000,
});
