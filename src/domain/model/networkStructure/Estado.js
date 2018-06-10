import { knexPg } from '../../../../config'
import { Model } from 'objection'

Model.knex(knexPg)

export default class Estado extends Model {
  static get tableName() {
    return 'ESTADO'
  }
}
