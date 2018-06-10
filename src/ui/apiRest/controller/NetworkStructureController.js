import { GetRegion } from '../../../application/networkStructure'
import { GetSubregion } from '../../../application/networkStructure'
import { GetStation } from '../../../application/networkStructure'
import { GetSector } from '../../../application/networkStructure'
import { GetCluster } from '../../../application/networkStructure'
import { GetMercado } from '../../../application/networkStructure'
import { GetEstado } from '../../../application/networkStructure'

class NetworkStructureController {
  constructor() {}
  async getAllRegion(req, res) {
    const resultRegion = await GetRegion.getAllRegion()
    return res.send(resultRegion).json()
  }

  async getAllSubregion(req, res) {
    const resultSubregion = await GetSubregion.getAllSubregion()
    return res.send(resultSubregion).json()
  }

  async getStationFromIdTechAndIdRegion(req, res) {
    const resultStation = await GetStation.getStationFromIdTechAndIdRegion(
      req.params.idTech,
      req.params.idRegion
    )
    return res.send(resultStation).json()
  }

  async getStationFromIdTechAndIdSubregion(req, res) {
    const resultStation = await GetStation.getStationFromIdTechAndIdSubregion(
      req.params.idTech,
      req.params.idSubregion
    )
    return res.send(resultStation).json()
  }

  async getSectorFromIdTechAndIdStation(req, res) {
    const resultSector = await GetSector.getSectorFromIdTechAndIdStation(
      req.params.idTech,
      req.params.idStation
    )
    return res.send(resultSector).json()
  }

  async getClusterFromIdRegion(req, res) {
    const resultCluster = await GetCluster.getClusterFromIdRegion(
      req.params.idRegion
    )
    return res.send(resultCluster).json()
  }

  async getClusterFromIdSubregion(req, res) {
    const resultCluster = await GetCluster.getClusterFromIdSubregion(
      req.params.idSubregion
    )
    return res.send(resultCluster).json()
  }

  async getMercadoFromIdRegion(req, res) {
    const resultMercado = await GetMercado.getMercadoFromIdRegion(
      req.params.idRegion
    )
    return res.send(resultMercado).json()
  }

  async getMercadoFromIdSubregion(req, res) {
    const resultMercado = await GetMercado.getMercadoFromIdSubregion(
      req.params.idSubregion
    )
    return res.send(resultMercado).json()
  }

  // Estados

  async getStateFromIdRegion(req, res) {
    const resultEstado = await GetEstado.getStateFromIdRegion(
      req.params.idRegion
    )
    return res.send(resultEstado).json()
  }

  async getStateFromIdSubregion(req, res) {
    const resultEstado = await GetEstado.getStateFromIdSubregion(
      req.params.idSubregion
    )
    return res.send(resultEstado).json()
  }
}

export default new NetworkStructureController()
