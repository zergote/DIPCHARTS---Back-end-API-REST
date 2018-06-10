import uuid from 'uuid/v1'
import { Crypt } from '../../../infrastructure/support'

async function factoryUser(dataUser) {
  let encryptData = await Crypt.encrypt(dataUser.PASSWORD)
  let newUser = {
    ID: uuid(),
    USER_NAME: dataUser.USER_NAME,
    PASSWORD: encryptData,
    FIRST_NAME: dataUser.FIRST_NAME,
    LAST_NAME: dataUser.LAST_NAME,
    ROL: 'Especialista',
    EMAIL: dataUser.EMAIL,
    USER_LEVEL: 2,
    ACTIVE_STATUS: false,
    ID_REGION: dataUser.ID_REGION,
  }
  return newUser
}

export default factoryUser
