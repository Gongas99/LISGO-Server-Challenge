const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const config = require('../config/settings')
const auth = require('../auth')

module.exports = {
    /**
     * Function that returns the user with the specific id
     * @param {*} id 
     * @returns 
     */
    getUserById: async function (id) {
        return await User.query().findById(id)
            .withGraphFetched('[tasks as completedTasks, tasks as incompletedTasks]')
            .modifyGraph('completedTasks', builder => {
                //join with an object with only the completed tasks
                builder.where('state', '=', true);
            }).modifyGraph('incompletedTasks', builder => {
                //join with an object with only the incompleted tasks
                builder.where('state', '=', false);
            });
    },

    /**
     * Function that returns all the users with the completed and incompleted tasks associated
     * @returns 
     */
    getAllUsers: async function () {
        return await User.query()
            .withGraphFetched('[tasks as completedTasks, tasks as incompletedTasks]')
            .modifyGraph('completedTasks', builder => {
                //join with an object with only the completed tasks
                builder.where('state', '=', true);
            }).modifyGraph('incompletedTasks', builder => {
                //join with an object with only the incompleted tasks
                builder.where('state', '=', false);
            });
    },

    /**
     * Fuction that creates a new user in the system with the info given
     * @param {*} name 
     * @param {*} surname 
     * @param {*} password 
     * @param {*} roleId 
     * @returns 
     */
    addUser: async function (name, surname, password, roleId) {
        const hashedPassword = auth.generateHash(password)
        return await User.query().insertAndFetch({
            name,
            surname,
            password: hashedPassword,
            roleId
        });
    }
}
