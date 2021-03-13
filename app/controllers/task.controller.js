const Task = require('../models/task.model');

/**
 * Function that converts the filter string to a boolean or null, if no filter is applied
 * @param {String} Filter
 * @returns {boolean} state
 */
function getFilter(string) {
    switch (string) {
        case 'COMPLETE':
            return true
        case 'INCOMPLETE':
            return false;
        case 'ALL':
            return null;
        default:
            return null;
    }
}

/**
 * Function that converts the orderBy string to a string compatible with the tables from the database
 * @param {String} orderBy 
 * @returns {String} Table Name
 */
function getOrderBy(string) {
    switch (string) {
        case 'DESCRIPTION':
            return 'description';
        case 'DATE_ADDED':
            return 'dateAdded';
        default:
            return 'dateAdded';
    }
}

/**
 * Function that helps identify what needs to be updated in database
 * @param {Object} state 
 * @param {Object} description 
 * @returns 
 */
function checkUpdate(state, description) {
    if (state !== undefined) {
        if (description) {
            return { state, description }
        }
        return { state }
    }
    return { description }
}

module.exports = {
    /**
     * Function that returns the task with the specific id
     * @param {*} id 
     * @returns 
     */
    getTaskById: async function (id, cb) {
        //TODO try catch
        const task = await Task.query().findById(id);
        return cb(null, task)
    },

    getAllTasks: async function (filter, orderBy, cb) {
        filter = getFilter(filter);
        orderBy = getOrderBy(orderBy);
        let result = null
        if (filter) {
            result = await Task.query().where({ state: filter }).orderBy(orderBy, 'ASC');
        }
        else {
            result = await Task.query().orderBy(orderBy, 'ASC');
        }
        return cb(null, result)
    },

    addTask: async function (description) {
        const newTask = await Task.query().insertAndFetch({
            description,
            state: false
        });
        return newTask;
    },

    removeTask: async function (id, cb) {
        const task = await Task.query().findById(id);
        if (!task) {
            return cb({
                success: false,
                data: {}
            }, 404)
        }
        await Task.query()
            .where({ id })
            .del()
        return cb({
            success: true,
            data: {}
        }, 200)
    },

    updateTask: async function (id, state, description, cb) {
        const task = await Task.query().findById(id);

        //check if task exists
        if (!task) {
            return cb({
                success: false,
                data: {}
            }, 404)
        }

        //check if task has complete/true state
        if (task.state) {
            return cb({
                success: false,
                data: {}
            }, 400)
        }

        //select only what needs update
        let toUpdate = checkUpdate(state, description);

        //update
        await Task.query()
            .where({ id })
            .update(toUpdate)

        //return the updated task
        const result = await Task.query()
            .findById(id)

        return cb({
            success: true,
            data: result
        }, 200)
    }
}
