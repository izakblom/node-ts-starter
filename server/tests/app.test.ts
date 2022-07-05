import supertest from "supertest";
import { Application } from "express";
import { getMockConfig } from "./mocks";

let app: Application;

beforeAll(() => {
  jest.mock("./../src/config.ts", () => ({
    GetConfig: jest.fn(() => getMockConfig()),
  }));

  const createApp = require("./../src/app").default;
  app = createApp();
});

describe("app", () => {
  it("responds to GET /", async () => {
    await supertest(app).get("/").expect(200);
  });
});
