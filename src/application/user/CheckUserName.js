import { ObjectionUserRepository } from '../../infrastructure/persistence/repositories/domain/model/user'

class CheckUserName {
  async checkUsername(USER_NAME) {
    let resultCheck = await ObjectionUserRepository.findUserName(USER_NAME)
    if (resultCheck.length >= 1) {
      return true
    } else {
      return false
    }
  }
}

module.exports = new CheckUserName()
