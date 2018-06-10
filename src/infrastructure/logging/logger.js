import Log4js from 'log4js'

export default ({ config }) => {
  Log4js.configure(config.LOGGING)

  return Log4js.getLogger()
}
