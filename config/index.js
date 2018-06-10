const path = require('path')

const ENV = process.env.NODE_ENV || 'development'

const envConfig = require(path.join(__dirname, 'environments', ENV))

//Configuracion de conexiones a bases de datos
const knexOc = require('knex')(envConfig.database.knexOC)
const knexPg = require('knex')(envConfig.database.knexPg)

// Variable para la cadena de encriptación de los datos de JSON WEB TOKENS
let secretString = envConfig.auth.secretString

//Variable para almacenar Puerto del API REST
let port = envConfig.server.port

let logging = envConfig.logging

const config = {
  [ENV]: true,
  ENV: ENV,
  PORT: port,
  SECRETSTRING: secretString,
  LOGGING: logging,
  KNEXOC: knexOc,
  KNEXPG: knexPg,
}

export { config, knexOc, knexPg, secretString }
