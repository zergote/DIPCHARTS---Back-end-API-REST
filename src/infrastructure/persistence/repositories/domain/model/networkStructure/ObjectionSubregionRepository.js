import { Subregion } from '../../../../../../domain/model/networkStructure'
import { knexPg } from '../../../../../../../config'
import { Model } from 'objection'

class ObjectionSubregionRepository {
  async getAllSubregion() {
    Model.knex(knexPg)
    const resultSubregion = await Subregion.query().select(
      'ID',
      'SUBREGION AS REGION'
    )
    return resultSubregion
  }
}

export default new ObjectionSubregionRepository()
