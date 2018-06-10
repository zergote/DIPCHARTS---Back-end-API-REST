import { knexPg } from '../../../../config'
import { Model } from 'objection'

Model.knex(knexPg)

export default class Kpi extends Model {
  static get tableName() {
    return 'KPI'
  }
}
