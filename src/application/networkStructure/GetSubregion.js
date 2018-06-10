import { ObjectionSubregionRepository } from '../../infrastructure/persistence/repositories/domain/model/networkStructure'

class GetSubregion {
  async getAllSubregion() {
    let resultSubregion = await ObjectionSubregionRepository.getAllSubregion()
    return resultSubregion
  }
}

export default new GetSubregion()
