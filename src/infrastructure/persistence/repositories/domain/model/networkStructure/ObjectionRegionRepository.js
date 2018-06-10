import { Region } from '../../../../../../domain/model/networkStructure'
import { knexPg } from '../../../../../../../config'
import { Model } from 'objection'

class ObjectionRegionRepository {
  async getAllRegion() {
    Model.knex(knexPg)
    const resultRegion = await Region.query().select('ID', 'REGION')
    return resultRegion
  }

  async getRegionByID(idRegion) {
    Model.knex(knexPg)
    const resultRegion = await Region.query()
      .select('REGION')
      .where('ID', idRegion)
    return resultRegion
  }
}

export default new ObjectionRegionRepository()
