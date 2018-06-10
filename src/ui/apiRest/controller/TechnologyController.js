import { GetTechnology } from '../../../application/technology'
import { GetNetworkService } from '../../../application/networkService'
class TechnologyController {
  constructor() {}
  async getTechnology(req, res) {
    const resultIdTechnology = await GetNetworkService.getIdTechFromIdService(
      req.params.idService
    )
    const resultTechnology = await GetTechnology.getTechnologyFromId(
      resultIdTechnology
    )
    return res.send(resultTechnology).json()
  }
}

export default new TechnologyController()
