'use strict';

const Task = require('../models/task');

module.exports = [
    {
        method: 'GET',
        path: '/task/{id}',
        handler: async (request, h) => {
            const id = request.params.id;

            const task = await Task.query().findById(id);
            return task;
        }
    },
    {
        method: 'GET',
        path: '/tasks',
        handler: async (request, h) => {
            const id = request.params.id;

            const task = await Task.query();
            return task;
        }
    }
]