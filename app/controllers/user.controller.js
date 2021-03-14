const User = require('../models/user.model');

module.exports = {
    /**
     * Function that returns the user with the specific id
     * @param {*} id 
     * @returns 
     */
    getUserById: async function (id, cb) {
        try {
            const user = await User.query().findById(id)
                .withGraphFetched('[tasks as completedTasks, tasks as incompletedTasks]')
                .modifyGraph('completedTasks', builder => {
                    //join with an object with only the completed tasks
                    builder.where('state', '=', true);
                }).modifyGraph('incompletedTasks', builder => {
                    //join with an object with only the incompleted tasks
                    builder.where('state', '=', false);
                });
            return cb(null, user)
        }
        catch (err) {
            console.log(err)
            return cb(err, null)
        }
    },

    getAllUsers: async function (cb) {
        try {
            const user = await User.query()
                .withGraphFetched('[tasks as completedTasks, tasks as incompletedTasks]')
                .modifyGraph('completedTasks', builder => {
                    //join with an object with only the completed tasks
                    builder.where('state', '=', true);
                }).modifyGraph('incompletedTasks', builder => {
                    //join with an object with only the incompleted tasks
                    builder.where('state', '=', false);
                });
            return cb(null, user)
        }
        catch (err) {
            console.log(err)
            return cb(err, null)
        }
    },
}
