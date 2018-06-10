import { NetworkService } from '../../../../../../domain/model/networkService'
import { knexPg } from '../../../../../../../config'
import { Model } from 'objection'

class ObjectionNetworkServiceRepository {
  async getServices() {
    Model.knex(knexPg)
    const resultService = await NetworkService.query().select(
      'ID',
      'ID_TECHNOLOGY',
      'SERVICE',
      'DB_TABLE_NAME'
    )
    return resultService
  }
  async getTableName(idService) {
    Model.knex(knexPg)
    const resultTableName = await NetworkService.query()
      .select('DB_TABLE_NAME')
      .where('ID', idService)
    if (resultTableName.length === 0)
      return {
        process: false,
        message: 'No hay un servicio con ese ID',
      }
    return resultTableName[0].DB_TABLE_NAME
  }

  async getIdTechFromIdService(idService) {
    Model.knex(knexPg)
    const resultIdTechnology = await NetworkService.query()
      .select('ID_TECHNOLOGY')
      .where('ID', idService)
    if (resultIdTechnology.length === 0)
      return {
        process: false,
        message: 'No hay un servicio con ese ID',
      }
    return resultIdTechnology[0].ID_TECHNOLOGY
  }
}

export default new ObjectionNetworkServiceRepository()
