const jsonwebtoken = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const config = require('../config/settings')

/**
 * Function that validates if the token received is valid
 * @param {*} decoded Decoded but unverified JWT received from client
 * @param {*} request Original request received from the client
 * @param {*} h Response toolkit
 * @returns Validation Object
 */
const validateJwt = async (decoded, request, h) => {
  //TODO verify if user exists
  return { isValid: true }
}

/**
 * Function that generates a JWT signed with the data receivd
 * @param {*} payload Data to be signed
 * @returns JWT signed
 */
const generateJwt = payload => {
  return jsonwebtoken.sign(payload, config.accessTokenSecret)
}

/**
 * Function that generates a hashed password
 * @param {*} password Plan text password
 * @returns Hashed password
 */
const generateHash = password => {
  return bcrypt.hashSync(password, config.bcrypt.salt);
}

/**
 * Function that compares a plan text password with an hashed one
 * @param {*} password Plan text password
 * @param {*} hash Hashed Password
 * @returns Boolean with the comparison result
 */
const compareHash = (password) => {
  return bcrypt.hashSync(password, config.bcrypt.salt);
}

module.exports = {
  generateJwt,
  validateJwt,
  generateHash,
  compareHash
}
