import express = require("express");
import { json } from "body-parser";
import cors from "cors";

import DocumentationRoutes = require("./routes/documentation.routes.controller");
import AccountsRoutes = require("./routes/accounts.routes.controller");

const createApp = (): express.Application => {
  const app = express();
  app.use(json());
  app.use(cors());

  app.use(DocumentationRoutes);
  app.use(AccountsRoutes);

  return app;
};

export default createApp;
