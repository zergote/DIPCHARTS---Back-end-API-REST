import { GetNetworkService } from '../../../application/networkService'

class NetworkServiceController {
  constructor() {}
  async getServices(req, res) {
    const resultServices = await GetNetworkService.getServices()
    return res.send(resultServices).json()
  }
  async getTableName(req, res) {
    const resultTechDBTableName = await GetNetworkService.getTableName(
      req.params.idService
    )
    return res.send(resultTechDBTableName).json()
  }
}

export default new NetworkServiceController()
