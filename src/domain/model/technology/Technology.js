import { knexPg } from '../../../../config'
import { Model } from 'objection'

Model.knex(knexPg)

export default class Technology extends Model {
  static get tableName() {
    return 'TECHNOLOGY'
  }
}
