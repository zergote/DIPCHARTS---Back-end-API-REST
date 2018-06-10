import { knexPg } from '../../../../config'
import { Model } from 'objection'

Model.knex(knexPg)

export default class Station extends Model {
  static get tableName() {
    return 'STATION'
  }
}
