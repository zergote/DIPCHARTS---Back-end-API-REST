import { ObjectionUserRepository } from '../../infrastructure/persistence/repositories/domain/model/user'

class GetUser {
  async getUser(ID) {
    let resultUser = await ObjectionUserRepository.getUser(ID)
    return resultUser
  }
}

module.exports = new GetUser()
