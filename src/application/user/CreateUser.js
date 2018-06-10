import { ObjectionUserRepository } from '../../infrastructure/persistence/repositories/domain/model/user'
import { factoryUser } from '../../domain/model/factory'

class CreateUser {
  async createUser(userData) {
    const newUser = await factoryUser(userData)
    const resultCreateUser = await ObjectionUserRepository.create(newUser)
    return resultCreateUser
  }
}

module.exports = new CreateUser()
