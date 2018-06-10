import { knexPg } from '../../../../config'
import { Model } from 'objection'

Model.knex(knexPg)

export default class Sector extends Model {
  static get tableName() {
    return 'SECTOR'
  }
}
