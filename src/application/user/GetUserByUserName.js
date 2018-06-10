import { ObjectionUserRepository } from '../../infrastructure/persistence/repositories/domain/model/user'

class GetUserByUserName {
  async getUserByUserName(USER_NAME) {
    let resultUser = await ObjectionUserRepository.getUserByUserName(USER_NAME)
    return resultUser[0]
  }
}

module.exports = new GetUserByUserName()
