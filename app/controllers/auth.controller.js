const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const auth = require('../auth')

/**
 * Controller functions about the authentication
 */
module.exports = {
    /**
     * Login function that checks if user exists and the password is correct, 
     * and then returns all the info needed for authentication
     * @param {*} name User name
     * @param {*} password User password
     * @returns 
     */
    login: async function (name, password) {
        const hashedPassword = auth.compareHash(password)

        const user = await User.query().findOne({
            name,
            password: hashedPassword
        }).withGraphFetched('role')

        //check if user exists
        if (!user) {
            return { data: {}, code: 404 }
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