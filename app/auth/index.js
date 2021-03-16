const jsonwebtoken = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const config = require('../config/settings')

const validateJwt = async decodedJWT => {
  //TODO validar o role
  return { isValid: true, errorMessage: 'CHORA' }
}

const generateJwt = payload => {
  return jsonwebtoken.sign(payload, config.accessTokenSecret)
}

const generateHash = password => {
  return bcrypt.hashSync(password, 10);
}

const compareHash = (password, hash) => {
  return bcrypt.compare(password, hash)
}

module.exports = {
  generateJwt,
  validateJwt,
  generateHash,
  compareHash
}
