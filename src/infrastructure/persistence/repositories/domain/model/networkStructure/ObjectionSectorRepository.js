import { Sector } from '../../../../../../domain/model/networkStructure'
import { knexPg } from '../../../../../../../config'
import { Model } from 'objection'

class ObjectionSectorRepository {
  async getSectorFromIdTechAndIdStation(idTech, idStation) {
    Model.knex(knexPg)
    const resultSector = await Sector.query()
      .select('ID', 'SECTOR')
      .where('ID_STATION', idStation)
      .andWhere('ID_TECHNOLOGY', idTech)
    return resultSector
  }

  async getSectorNameFromId(idSector) {
    Model.knex(knexPg)
    const resultSectorName = (await Sector.query()
      .select('SECTOR')
      .where('ID', idSector))[0].SECTOR
    return resultSectorName
  }
}

export default new ObjectionSectorRepository()
