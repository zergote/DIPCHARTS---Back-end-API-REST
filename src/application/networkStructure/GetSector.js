import { ObjectionSectorRepository } from '../../infrastructure/persistence/repositories/domain/model/networkStructure'

class GetSector {
  async getSectorFromIdTechAndIdStation(idTech, idStation) {
    let resultSector = await ObjectionSectorRepository.getSectorFromIdTechAndIdStation(
      idTech,
      idStation
    )
    return resultSector
  }

  async getSectorNameFromId(idSector) {
    let resultSectorName = await ObjectionSectorRepository.getSectorNameFromId(
      idSector
    )
    return resultSectorName
  }
}

export default new GetSector()
