'use strict';

const TaskController = require('../controllers/task.controller');
const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/todo/{id}',
        handler: async (request, h) => {
            const id = request.params.id;
            const task = TaskController.getTaskById(id);
            return task;
        }
    },
    {
        method: 'GET',
        path: '/todos',
        handler: async (request, h) => {
            const id = request.params.id;
            const tasks = TaskController.getAllTasks();
            return tasks;
        }
    },
    {
        method: 'PUT',
        path: '/todos',
        handler: async (request, h) => {
            

            return 1;
        },
        options: {
            validate: {
                query: Joi.object({
                    description: Joi.string().min(1).max(255)
                })
            }
        }
    }
]