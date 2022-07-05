/* eslint-disable @typescript-eslint/no-misused-promises */
import express = require("express");

import { GetAccountHandler } from "../handlers/GetAccountHandler";
import { PostAccountHandler } from "../handlers/PostAccountHandler";

const AccountsRoutes = express.Router();

/**
 * @swagger
 * paths: /accounts
 */
AccountsRoutes.get("/accounts/:id", GetAccountHandler);
AccountsRoutes.post("/accounts/", PostAccountHandler);

export = AccountsRoutes;
