import { Technology } from '../../../../../../domain/model/technology'
import { knexPg } from '../../../../../../../config'
import { Model } from 'objection'

class ObjectionTechnologyRepository {
  async getTechnologyFromId(idTechnology) {
    Model.knex(knexPg)
    const resultTechnology = await Technology.query()
      .select('ID', 'TECHNOLOGY')
      .where('ID', idTechnology)
    return resultTechnology
  }
}

export default new ObjectionTechnologyRepository()
