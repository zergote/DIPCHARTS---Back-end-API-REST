import { ObjectionKpiRepository } from '../../infrastructure/persistence/repositories/domain/model/kpi'
import { knexPg } from '../../../config'
import { Model } from 'objection'

class GetKpi {
  async getKpiFromIdService(idService) {
    Model.knex(knexPg)
    let resultKpi = await ObjectionKpiRepository.getKpiFromIdService(idService)
    return resultKpi
  }
}

export default new GetKpi()
