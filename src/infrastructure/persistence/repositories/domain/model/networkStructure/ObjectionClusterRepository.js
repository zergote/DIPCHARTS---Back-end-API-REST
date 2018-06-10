import { Cluster } from '../../../../../../domain/model/networkStructure'
import { knexPg } from '../../../../../../../config'
import { Model } from 'objection'

class ObjectionClusterRepository {
  async getClusterFromIdRegion(idRegion) {
    Model.knex(knexPg)
    const resultCluster = await Cluster.query()
      .select('ID', 'CLUST')
      .where('ID_REGION', idRegion)
    return resultCluster
  }

  async getClusterFromIdSubregion(idSubregion) {
    Model.knex(knexPg)
    const resultCluster = await Cluster.query()
      .select('ID', 'CLUST')
      .where('ID_SUBREGION', idSubregion)
    return resultCluster
  }
}

export default new ObjectionClusterRepository()
