import { Mercado } from '../../../../../../domain/model/networkStructure'
import { knexPg } from '../../../../../../../config'
import { Model } from 'objection'

class ObjectionMercadoRepository {
  async getMercadoFromIdRegion(idRegion) {
    Model.knex(knexPg)
    const resultMercado = await Mercado.query()
      .select('ID', 'MERCADO')
      .where('ID_REGION', idRegion)
    return resultMercado
  }

  async getMercadoFromIdSubregion(idSubregion) {
    Model.knex(knexPg)
    const resultMercado = await Mercado.query()
      .select('ID', 'MERCADO')
      .where('ID_SUBREGION', idSubregion)
    return resultMercado
  }
}

export default new ObjectionMercadoRepository()
