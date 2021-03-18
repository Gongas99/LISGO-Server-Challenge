const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const auth = require('../auth')

module.exports = {
    login: async function (name, password, request, cb) {
        const user = await User.query().findOne({
            name
        }).withGraphFetched('role')

        //check if user exists
        if(!user){
            return cb({}, null)
        }

        const isCorrect = auth.compareHash(password, user.password)
        //check if password is correct
        if (!isCorrect) {
            return cb({}, null)
        }

        //request.auth.session.set(user);

        let scope = 'normal'
        if(user.role.id === 2){
            scope = 'admin'
        }
        
        //pass the user without the password
        const result = user
        delete result.password;

        //sign the jwt before sending and add to the response
        result.accessToken = auth.generateJwt({ id: user.id, name: user.name, surname: user.surname, scope });
        return cb(null, result);
    }
}