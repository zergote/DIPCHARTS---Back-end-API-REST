import { Station } from '../../../../../../domain/model/networkStructure'
import { knexPg } from '../../../../../../../config'
import { Model } from 'objection'

class ObjectionStationRepository {
  async getStationFromIdTechAndIdRegion(idTech, idRegion) {
    Model.knex(knexPg)
    const resultStation = await Station.query()
      .select('ID', 'STATION')
      .where('ID_TECHNOLOGY', idTech)
      .andWhere('ID_REGION', idRegion)
    return resultStation
  }

  async getStationFromIdTechAndIdSubregion(idTech, idSubregion) {
    Model.knex(knexPg)
    const resultStation = await Station.query()
      .select('ID', 'STATION')
      .where('ID_TECHNOLOGY', idTech)
      .andWhere('ID_SUBREGION', idSubregion)
    return resultStation
  }

  async getStationFromName(stationName) {
    try {
      Model.knex(knexPg)
      const resultStation = await Station.query()
        .select('ID', 'STATION')
        .where('STATION', stationName)
      return resultStation
    } catch (e) {
      console.log(e)
    }
  }

  async insertNewStation(data) {
    let resultStation = await STATION.query()
      .insert({
        STATION: data.STATION,
        ID_REGION: data.ID_REGION,
        ID_TECHNOLOGY: data[0].ID_TECHNOLOGY,
        ID_SUBREGION: data[0].ID_SUBREGION,
        ID_CLUST: data[0].ID_CLUST,
      })
      .returning('ID')
  }
}

export default new ObjectionStationRepository()
