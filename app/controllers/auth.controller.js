const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const auth = require('../auth')

module.exports = {
    login: async function (name, password, cb) {
        const user = await User.query().findOne({
            name
        })

        const isCorrect = auth.compareHash(password, user.password)
        //check if user exists
        if (!isCorrect) {
            return cb({}, null)
        }

        //sign the jwt before sending
        const accessToken = auth.generateJwt({ id: user.id, name: user.name, surname: user.surname });
        return cb(null, { accessToken });
    }
}