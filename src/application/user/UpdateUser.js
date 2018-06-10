import { ObjectionUserRepository } from '../../infrastructure/persistence/repositories/domain/model/user'

class UpdateUser {
  async updateUser(ID, dataUser) {
    let resultUpdateUser = await ObjectionUserRepository.updateUser(
      ID,
      dataUser
    )
    return resultUpdateUser
  }
}

module.exports = new UpdateUser()
