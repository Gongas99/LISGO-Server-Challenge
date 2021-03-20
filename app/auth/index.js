const jsonwebtoken = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const config = require('../config/settings')

const validateJwt = async (decoded, request, h) => {
  //TODO verify if user exists
  return { isValid: true }
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
