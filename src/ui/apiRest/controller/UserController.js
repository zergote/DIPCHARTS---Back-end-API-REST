import { GetAllUsers } from '../../../application/user'
import { CreateUser } from '../../../application/user'
import { CheckUserName } from '../../../application/user'
import { GetUser } from '../../../application/user'
import { UpdateUser } from '../../../application/user'
import { RemoveUser } from '../../../application/user'
import { RegisterUser } from '../../../application/service'
import { SignInUser } from '../../../application/service'

class UserController {
  async getAllUsers(req, res) {
    const resultUsers = await GetAllUsers.getAllUsers()
    return res.json(resultUsers)
  }

  async getUser(req, res) {
    const resultUser = await GetUser.getUser(req.params.userID)
    return res.json(resultUser)
  }

  async updateUser(req, res) {
    console.log(req.body)
    const resultUpdate = await UpdateUser.updateUser(
      req.params.userID,
      req.body
    )
    return res.json(resultUpdate)
  }

  async removeUser(req, res) {
    const resultRemoveUser = await RemoveUser.removeUser(req.params.userID)
    return res.json(resultRemoveUser)
  }

  async registerUser(req, res) {
    if (req.body === {}) {
      return res.status(400).json({
        process: false,
        message: 'No se ha enviado información de usuario',
      })
    }
    const resultRegisterUser = await RegisterUser.registerUser(
      req.body.ID_REGION,
      req.body.FIRST_NAME,
      req.body.LAST_NAME,
      req.body.USER_NAME,
      req.body.PASSWORD,
      req.body.EMAIL
    )
    console.log(resultRegisterUser)
    if (resultRegisterUser.process) {
      return res.status(201).json({
        process: resultRegisterUser.process,
        message: resultRegisterUser.message,
        firstName: resultRegisterUser.firstName,
      })
    } else {
      return res.status(400).json({
        process: resultRegisterUser.process,
        message: resultRegisterUser.message,
      })
    }
  }

  async signInUser(req, res) {
    const resultSignInUser = await SignInUser.signInUser(
      req.body.USER_NAME,
      req.body.PASSWORD
    )

    if (resultSignInUser.process) {
      return res.status(201).json({
        process: resultSignInUser.process,
        message: resultSignInUser.message,
        token: resultSignInUser.token,
      })
    } else {
      return res.status(201).json({
        process: resultSignInUser.process,
        message: resultSignInUser.message,
      })
    }
  }

  loginRequired(req, res, next) {
    if (req.user) {
      next()
    } else {
      return res.status(401).json({
        process: false,
        message: 'Acceso no autorizado',
      })
    }
  }
}

export default new UserController()
