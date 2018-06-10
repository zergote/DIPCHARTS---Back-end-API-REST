import knexConfig from '../../knexfile'
const path = require('path')
const logPath = path.join(__dirname, '../../logs/development.log')

module.exports = {
  server: {
    port: process.env.PORT || 5000,
  },
  logging: {
    appenders: {
      everything: {
        type: 'dateFile',
        filename: logPath,
        pattern: '.yyyy-MM-dd-hh',
        compress: true,
      },
      console: { type: 'console', layout: { type: 'coloured' } },
    },
    categories: {
      default: { appenders: ['everything'], level: 'debug' },
      default: { appenders: ['console'], level: 'debug' },
    },
  },
  database: {
    knexOC: null,
    knexPg: knexConfig.development,
  },
  auth: {
    secretString: process.env.SECRETSTRING || 'nodeauthsecret',
  },
}
