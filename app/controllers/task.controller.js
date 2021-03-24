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
    getTaskById: async function (id) {
        return await Task.query().findById(id);
    },

    /**
     * Function that returns all the tasks with an optional filter and order
     * @param {*} filter 
     * @param {*} orderBy 
     * @returns 
     */
    getAllTasks: async function (filter, orderBy) {
        filter = getFilter(filter);
        orderBy = getOrderBy(orderBy);
        if (filter !== null) {
            return await Task.query().where({ state: filter }).orderBy(orderBy, 'ASC');
        }
        return await Task.query().orderBy(orderBy, 'ASC');
    },

    /**
     * Function that returns all the tasks from a user with an optional filter and order
     * @param {*} filter 
     * @param {*} orderBy 
     * @param {*} userId 
     * @returns 
     */
    getTasksByUserId: async function (filter, orderBy, userId) {
        filter = getFilter(filter);
        orderBy = getOrderBy(orderBy);
        if (filter !== null) {
            return await Task.query().where({ state: filter, userId }).orderBy(orderBy, 'ASC');
        }
        return await Task.query().where({ userId }).orderBy(orderBy, 'ASC');
    },

    /**
     * Function that creates a new task with the given description and userId
     * @param {*} description 
     * @param {*} userId 
     * @returns 
     */
    addTask: async function (description, userId,) {
        return await Task.query().insertAndFetch({
            description,
            userId,
            state: false
        });
    },

    /**
     * Function that removes a task from the id given, if that task exists
     * @param {*} id 
     * @returns 
     */
    removeTask: async function (id) {
        const task = await Task.query().findById(id);
        if (!task) {
            return { task: {}, code: 404 }
        }
        const result = await Task.query()
            .where({ id })
            .del()
        return { result, code: 200 }
    },

    /**
     * Function that edits the information from a task
     * @param {*} id 
     * @param {*} state 
     * @param {*} description 
     * @returns 
     */
    updateTask: async function (id, state, description) {
        const task = await Task.query().findById(id);

        //check if task exists
        if (!task) {
            return { task: {}, code: 404 }
        }

        //check if task has complete/true state and the description is going to be modified
        if (task.state && description) {
            return { task: {}, code: 400 }
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

        return { task: result, code: 200 }
    }
}
