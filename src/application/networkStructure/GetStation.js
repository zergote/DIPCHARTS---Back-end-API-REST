import { ObjectionStationRepository } from '../../infrastructure/persistence/repositories/domain/model/networkStructure'

class GetStation {
  async getStationFromIdTechAndIdRegion(idTech, idRegion) {
    let resultStation = await ObjectionStationRepository.getStationFromIdTechAndIdRegion(
      idTech,
      idRegion
    )
    return resultStation
  }

  async getStationFromIdTechAndIdSubregion(idTech, idSubregion) {
    let resultStation = await ObjectionStationRepository.getStationFromIdTechAndIdSubregion(
      idTech,
      idSubregion
    )
    return resultStation
  }
}

export default new GetStation()
