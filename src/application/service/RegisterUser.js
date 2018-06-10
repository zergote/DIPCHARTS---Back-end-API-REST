import { CheckUserName } from '../user'
import { CreateUser } from '../user'

//Agregar mas validaciones
//Este servicio maneja la comprobacion de la creacion de un nuevo usuario y sirve de fachada.
class RegisterUser {
  async registerUser(
    ID_REGION,
    FIRST_NAME,
    LAST_NAME,
    USER_NAME,
    PASSWORD,
    EMAIL
  ) {
    let resultCheck = await CheckUserName.checkUsername(USER_NAME)
    if (resultCheck) {
      return {
        process: false,
        message: 'El nombre de usuario ya esta siendo utilizado',
      }
    } else if (PASSWORD === undefined || PASSWORD === '') {
      return {
        process: false,
        message: 'No coloco la contraseña',
      }
    } else {
      let USER = {
        ID_REGION: ID_REGION,
        FIRST_NAME: FIRST_NAME,
        LAST_NAME: LAST_NAME,
        USER_NAME: USER_NAME,
        PASSWORD: PASSWORD,
        EMAIL: EMAIL,
      }
      let resultCreate = CreateUser.createUser(USER)
      return {
        process: true,
        message:
          'Usuario se ha registrado correctamente, espere por su activación',
        firstName: FIRST_NAME,
      }
    }
  }
}

export default new RegisterUser()
