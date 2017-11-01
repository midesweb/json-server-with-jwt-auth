/** librería de encriptado */
const jwt = require('jsonwebtoken')

const secret = 'DesarrolloWeb.com/EscuelaIT'

/** cifra el usuario durante un margen de tiempo */
exports.tokenGeneration = (user) => jwt.sign(user, secret, { expiresIn: '10m' })

/** verifica al usuario a partir del token  */
exports.verify = (token) => {
  try {
    return jwt.verify(token, secret)
  }
  catch(err){
    return false
  }
}