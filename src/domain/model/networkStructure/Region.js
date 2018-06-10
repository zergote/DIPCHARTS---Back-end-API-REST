import { knexPg } from '../../../../config'
import { Model } from 'objection'

Model.knex(knexPg)

export default class Region extends Model {
  static get tableName() {
    return 'REGION'
  }
}
