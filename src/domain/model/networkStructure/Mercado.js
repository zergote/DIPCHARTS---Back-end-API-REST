import { knexPg } from '../../../../config'
import { Model } from 'objection'

Model.knex(knexPg)

export default class Mercado extends Model {
  static get tableName() {
    return 'MERCADO'
  }
}
