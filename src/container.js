//Librerias para la creación de un container para la inversion de dependencias
import { createContainer, Lifetime } from "awilix";
import { scopePerRequest } from "awilix-express";

//Valores los valores de la configuración del sistema
import { config } from "../config/index";

//Clases, funciones y valores del sistema
import Server from "./ui/apiRest/index";

import router from "./ui/apiRest/routes/index";
import expressApp from "./ui/apiRest/express";

//Clases, funciones y valores del Middleware
import loggerMiddleware from "./ui/apiRest/logging/loggerMiddleware";
import errorHandler from "./ui/apiRest/errors/errorHandler";
import devErrorHandler from "./ui/apiRest/errors/devErrorHandler";

//Clases, funciones y valores de utilidades
import logger from "./infrastructure/logging/logger";

const container = createContainer();

// System
container
  .registerClass({
    server: [Server, { lifetime: Lifetime.SINGLETON }]
  })
  .registerFunction({
    expressApp: [expressApp, { lifetime: Lifetime.SINGLETON }],
    router: [router, { lifetime: Lifetime.SINGLETON }],
    logger: [logger, { lifetime: Lifetime.SINGLETON }]
  })
  .registerValue({
    config
  });

//Middlewares
container
  .registerFunction({
    loggerMiddleware: [loggerMiddleware, { lifetime: Lifetime.SINGLETON }]
  })
  .registerValue({
    containerMiddleware: scopePerRequest(container),
    errorHandler: config.production ? errorHandler : devErrorHandler
  });

module.exports = container;
