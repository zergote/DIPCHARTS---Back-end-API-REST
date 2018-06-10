import { knexPg } from '../../../../config'
import { Model } from 'objection'

Model.knex(knexPg)

export default class Cluster extends Model {
  static get tableName() {
    return 'CLUST'
  }
}
