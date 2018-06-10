import { ObjectionMercadoRepository } from '../../infrastructure/persistence/repositories/domain/model/networkStructure'

class GetMercado {
  async getMercadoFromIdRegion(idRegion) {
    let resultMercado = await ObjectionMercadoRepository.getMercadoFromIdRegion(
      idRegion
    )
    return resultMercado
  }

  async getMercadoFromIdSubregion(idSubregion) {
    let resultMercado = await ObjectionMercadoRepository.getMercadoFromIdSubregion(
      idSubregion
    )
    return resultMercado
  }
}

export default new GetMercado()
