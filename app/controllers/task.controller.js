const Task = require('../models/task.model');

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

module.exports = {
    /**
     * 
     * @param {*} id 
     * @returns 
     */
    getTaskById: async function (id) {
        try {
            let task = await Task.query().findById(id);
            return task;
        }
        catch {
            console.log('erro')
            //TODO complementar os catches
        }
    },

    getAllTasks: async function (filter, orderBy) {
        filter = getFilter(filter);
        orderBy = getOrderBy(orderBy);
        if (filter) {
            return await Task.query().where({ state: filter }).orderBy(orderBy, 'ASC');
        }
        return await Task.query().orderBy(orderBy, 'ASC');
    },

    addTask: async function (description) {
        try {
            const newTask = await Task.query().insertAndFetch({
                description,
                state: false
            });
            return newTask;
        }
        catch {
            console.log(newTask)
        }
    }
}
