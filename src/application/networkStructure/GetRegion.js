import { ObjectionRegionRepository } from '../../infrastructure/persistence/repositories/domain/model/networkStructure'

class GetRegion {
  async getAllRegion() {
    let resultRegion = await ObjectionRegionRepository.getAllRegion()
    return resultRegion
  }

  async getRegionByID(idRegion) {
    let resultRegion = await ObjectionRegionRepository.getRegionByID(idRegion)
    return resultRegion
  }
}

export default new GetRegion()
