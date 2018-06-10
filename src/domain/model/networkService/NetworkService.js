import { knexPg } from '../../../../config'
import { Model } from 'objection'

Model.knex(knexPg)

export default class NetworkService extends Model {
  static get tableName() {
    return 'SERVICE'
  }
}
