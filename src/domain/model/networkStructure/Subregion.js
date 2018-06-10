import { knexPg } from '../../../../config'
import { Model } from 'objection'

Model.knex(knexPg)

export default class Subregion extends Model {
  static get tableName() {
    return 'SUBREGION'
  }
}
