import { ObjectionEstadoRepository } from '../../infrastructure/persistence/repositories/domain/model/networkStructure'

class GetEstado {
  async getStateFromIdRegion(idRegion) {
    let resultEstado = await ObjectionEstadoRepository.getStateFromIdRegion(
      idRegion
    )
    return resultEstado
  }

  async getStateFromIdSubregion(idSubregion) {
    let resultEstado = await ObjectionEstadoRepository.getStateFromIdSubregion(
      idSubregion
    )
    return resultEstado
  }
}

export default new GetEstado()
