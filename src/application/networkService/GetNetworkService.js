import { ObjectionNetworkServiceRepository } from '../../infrastructure/persistence/repositories/domain/model/networkService'

import { knexPg } from '../../../config'
import { Model } from 'objection'

class GetNetworkService {
  async getServices() {
    Model.knex(knexPg)

    let resultService = await ObjectionNetworkServiceRepository.getServices()
    return resultService
  }

  async getTableName(idService) {
    Model.knex(knexPg)

    const resultTableName = await ObjectionNetworkServiceRepository.getTableName(
      idService
    )
    return resultTableName
  }

  async getIdTechFromIdService(idService) {
    Model.knex(knexPg)

    const resultIdTechnology = await ObjectionNetworkServiceRepository.getIdTechFromIdService(
      idService
    )
    return resultIdTechnology
  }
}

export default new GetNetworkService()
