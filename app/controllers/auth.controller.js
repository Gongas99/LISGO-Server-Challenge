const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const auth = require('../auth')

module.exports = {
    login: async function (name, password) {
        const user = await User.query().findOne({
            name
        }).withGraphFetched('role')

        //check if user exists
        if (!user) {
            return { data: {}, code: 404 }
        }

        //check if password is correct
        const isCorrect = auth.compareHash(password, user.password)
        if (!isCorrect) {
            return { data: {}, code: 401 }
        }

        //request.auth.session.set(user);

        let scope = 'normal'
        if (user.role.id === 2) {
            scope = 'admin'
        }

        //pass the user without the password
        delete user.password;

        //sign the jwt before sending and add to the response
        user.accessToken = auth.generateJwt({ id: user.id, name: user.name, surname: user.surname, scope });
        return { data: user, code: 200 }
    }
}