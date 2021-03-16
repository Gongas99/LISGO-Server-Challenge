const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const auth = require('../auth')

module.exports = {
    login: async function (name, password, request, cb) {
        const user = await User.query().findOne({
            name
        }).withGraphFetched('role')

        const isCorrect = auth.compareHash(password, user.password)
        //check if user exists
        if (!isCorrect) {
            return cb({}, null)
        }

        request.auth.session.set(user);

        let scope = 'normal'
        if(user.role.id === 2){
            scope = 'admin'
        }
        //sign the jwt before sending
        const accessToken = auth.generateJwt({ id: user.id, name: user.name, surname: user.surname, scope });
        return cb(null, { accessToken });
    }
}