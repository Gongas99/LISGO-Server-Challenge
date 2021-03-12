'use strict';

const TaskController = require('../controllers/task.controller');
const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/todos/{id}',
        handler: async (request, h) => {
            let task = TaskController.getTaskById(request.params.id);
            return task;
        },
        options: {
            validate: {
                params: Joi.object({
                    id: Joi.number().integer()
                })
            }
        }
    },
    {
        method: 'GET',
        path: '/todos',
        handler: async (request, h) => {
            let tasks = TaskController.getAllTasks(request.query.filter, request.query.orderBy);
            return tasks;
        },
        options: {
            validate: {
                query: Joi.object({
                    filter: Joi.string().min(1).max(10),
                    orderBy: Joi.string().min(1).max(11),
                })
            }
        }
    },
    {
        method: 'PUT',
        path: '/todos',
        handler: async (request, h) => {
            let newTask = TaskController.addTask(request.payload.description)

            return newTask;
        },
        options: {
            validate: {
                payload: Joi.object({
                    description: Joi.string().min(1).max(255)
                })
            }
        }
    },
    {
        method: 'DELETE',
        path: '/todos/{id}',
        handler: async (request, h) => {
            let newTask = TaskController.addTask(request.payload.description)

            return newTask;
        },
        options: {
            validate: {
                params: Joi.object({
                    id: Joi.number().integer()
                })
            }
        }
    }
]