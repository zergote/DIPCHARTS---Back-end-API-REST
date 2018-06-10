import { ObjectionClusterRepository } from '../../infrastructure/persistence/repositories/domain/model/networkStructure'

class GetCluster {
  async getClusterFromIdRegion(idRegion) {
    let resultCluster = await ObjectionClusterRepository.getClusterFromIdRegion(
      idRegion
    )
    return resultCluster
  }

  async getClusterFromIdSubregion(idSubregion) {
    let resultCluster = await ObjectionClusterRepository.getClusterFromIdSubregion(
      idSubregion
    )
    return resultCluster
  }
}

export default new GetCluster()
