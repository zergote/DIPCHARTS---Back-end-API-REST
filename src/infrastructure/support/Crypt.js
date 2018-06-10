import bcrypt from 'bcrypt'

class Crypt {
  async encrypt(data) {
    const saltRounds = 10
    let resultEncryptData = await bcrypt.hash(data, saltRounds)
    return resultEncryptData
  }

  async compare(passwordInput, passwordInDatabase) {
    const resultCompare = await bcrypt.compare(
      passwordInput,
      passwordInDatabase
    )
    return resultCompare
  }
}

export default new Crypt()
