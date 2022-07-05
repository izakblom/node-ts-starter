import express = require("express");
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { swaggerDocument } from "../swagger/swaggerDocument";

const DocumentationRoutes = express.Router();

const options = {
  swaggerDefinition: swaggerDocument,
  apis: ["**/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

DocumentationRoutes.use("/", swaggerUi.serve);
DocumentationRoutes.get("/", swaggerUi.setup(swaggerSpec));

export = DocumentationRoutes;
