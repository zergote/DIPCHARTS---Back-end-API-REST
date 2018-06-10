import { ObjectionUserRepository } from '../../infrastructure/persistence/repositories/domain/model/user'

class GetAllUsers {
  async getAllUsers() {
    let resultUsers = await ObjectionUserRepository.getAllUsers()
    return resultUsers
  }
}

module.exports = new GetAllUsers()
