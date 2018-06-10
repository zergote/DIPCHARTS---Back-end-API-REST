import { ObjectionUserRepository } from '../../infrastructure/persistence/repositories/domain/model/user'

class RemoveUser {
  async removeUser(ID) {
    let resultRemoveUser = await ObjectionUserRepository.removeUser(ID)
    return resultRemoveUser
  }
}

module.exports = new RemoveUser()
