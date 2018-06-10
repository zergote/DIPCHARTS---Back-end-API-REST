import { ObjectionTechnologyRepository } from '../../infrastructure/persistence/repositories/domain/model/technology'

class GetTechnology {
  async getTechnologyFromId(idTechnologyh) {
    const resultTechnology = await ObjectionTechnologyRepository.getTechnologyFromId(
      idTechnologyh
    )
    return resultTechnology
  }
}

export default new GetTechnology()
