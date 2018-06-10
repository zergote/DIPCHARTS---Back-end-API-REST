import morgan from 'morgan'
import LoggerStreamAdapter from '../../../infrastructure/logging/LoggerStreamAdapter'

export default ({ logger }) => {
  return morgan('dev', {
    stream: LoggerStreamAdapter.toStream(logger),
  })
}
