import { Estado } from '../../../../../../domain/model/networkStructure'
import { knexPg } from '../../../../../../../config'
import { Model } from 'objection'

class ObjectionEstadoRepository {
  async getStateFromIdRegion(idRegion) {
    Model.knex(knexPg)
    const resultEstado = await Estado.query()
      .distinct('ESTADO')
      .select()
      .where('ID_REGION', idRegion)
    return resultEstado
  }

  async getStateFromIdSubregion(idSubregion) {
    Model.knex(knexPg)
    const resultEstado = await Estado.query()
      .distinct('ESTADO')
      .select()
      .where('ID_SUBREGION', idSubregion)
    return resultEstado
  }
}

export default new ObjectionEstadoRepository()
