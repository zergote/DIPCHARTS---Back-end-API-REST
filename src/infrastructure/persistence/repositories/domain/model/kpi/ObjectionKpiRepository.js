import { Kpi } from '../../../../../../domain/model/kpi'
import { knexPg } from '../../../../../../../config'
import { Model } from 'objection'

class ObjectionKpiRepository {
  async getKpiFromIdService(idService) {
    Model.knex(knexPg)
    const resultKpi = await Kpi.query()
      .select('KPI')
      .where('ID_SERVICE', idService)
    return resultKpi
  }
}

export default new ObjectionKpiRepository()
