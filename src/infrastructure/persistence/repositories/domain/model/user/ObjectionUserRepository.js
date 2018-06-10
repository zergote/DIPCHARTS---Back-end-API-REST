import User from '../../../../../../domain/model/user'
import { knexPg } from '../../../../../../../config'
import { Model } from 'objection'

class ObjectionUserRepository {
  async getUser(ID) {
    Model.knex(knexPg)
    const result = await User.query().where('ID', ID)
    return result
  }

  async findUserName(USER_NAME) {
    Model.knex(knexPg)
    const result = await User.query()
      .select('USER_NAME')
      .where('USER_NAME', USER_NAME)
    return result
  }

  async getAllUsers() {
    Model.knex(knexPg)
    const result = await User.query()
      .select('*')
      .orderBy('USER_NAME', 'asc')
    return result
  }

  async getUsersByIdRegion(idRegion) {
    Model.knex(knexPg)
    const result = await User.query()
      .select('*')
      .where('ID_REGION', idRegion)
      .orderBy('USER_NAME', 'asc')
    return result
  }

  async create(dataUser) {
    Model.knex(knexPg)
    const result = await User.query()
      .insert(dataUser)
      .returning('ID')
    return result
  }

  async updateUser(ID, dataUser) {
    Model.knex(knexPg)
    console.log(dataUser)
    const result = await User.query()
      .patch(dataUser)
      .where('ID', ID)
    return result
  }

  async removeUser(ID) {
    Model.knex(knexPg)
    const result = await User.query()
      .delete()
      .where('ID', ID)
    return result
  }

  async getUserByUserName(USER_NAME) {
    Model.knex(knexPg)
    const result = await User.query().where('USER_NAME', USER_NAME)
    return result
  }
}

export default new ObjectionUserRepository()
