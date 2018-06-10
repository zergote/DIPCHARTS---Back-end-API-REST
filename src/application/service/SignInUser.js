import { GetUserByUserName } from '../user'
import { Crypt } from '../../infrastructure/support'
import jwt from 'jsonwebtoken'
import { secretString } from '../../../config'
import GetRegion from '../networkStructure/GetRegion'
//Agregar mas validaciones
//Este servicio maneja la autenticacion de usuario dentro del sistema
//Falta encriptrar datos del payload del token con CriptoJS o herramienta similar
class SignInUser {
  async signInUser(USER_NAME, PASSWORD) {
    const resultUser = await GetUserByUserName.getUserByUserName(USER_NAME)
    if (resultUser === undefined) {
      return {
        process: false,
        message: 'El nombre de usuario no existe',
      }
    }

    if (resultUser.ACTIVE_STATUS === false) {
      return {
        process: false,
        message: 'Su cuenta no se encuentra activa',
      }
    }
    let region = await GetRegion.getRegionByID(resultUser.ID_REGION)
    const checkPassword = await Crypt.compare(PASSWORD, resultUser.PASSWORD)
    console.log(checkPassword)
    if (checkPassword) {
      const dataPayload = {
        ID: resultUser.ID,
        USER_NAME: resultUser.USER_NAME,
        FIRST_NAME: resultUser.FIRST_NAME,
        LAST_NAME: resultUser.LAST_NAME,
        ROL: resultUser.ROL,
        EMAIL: resultUser.EMAIL,
        USER_LEVEL: resultUser.USER_LEVEL,
        ID_REGION: resultUser.ID_REGION,
        REGION: region[0].REGION,
      }

      const generateToken = jwt.sign(dataPayload, secretString, {
        expiresIn: '1h',
      })
      return {
        process: true,
        message: 'Usuario se ha autentificado correctamente',
        token: generateToken,
      }
    } else {
      return {
        process: false,
        message: 'La contraseña es incorrecta',
      }
    }
  }
}

export default new SignInUser()
