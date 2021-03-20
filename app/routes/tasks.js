'use strict';

const TaskController = require('../controllers/task.controller');
const Joi = require('joi');
const { basicResponse, codeResponse } = require('../helpers/responseHelper')

module.exports = [
    {
        method: 'GET',
        path: '/todos/{id}',
        handler: async (request, h) => {
            let response = null
            await TaskController.getTaskById(request.params.id, function (err, data) {
                response = basicResponse(h, err, data);
            });
            return response;
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
            let { filter, orderBy } = request.payload || {};
            let response = null
            await TaskController.getAllTasks(filter, orderBy, function (err, data) {
                response = basicResponse(h, err, data);
            });
            return response;
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
        method: 'GET',
        path: '/todos/user/{id}',
        handler: async (request, h) => {
            let { filter, orderBy } = request.payload || {};
            let userId = parseInt(request.params.id);
            let response = null

            //check if user is not admin and cannot access others Tasks
            let cred = request.auth.credentials;
            if (cred.id !== userId && cred.scope !== 'admin') {
                response = codeResponse(h, {}, 401);
            }
            else {
                await TaskController.getTasksByUserId(filter, orderBy, userId, function (err, data) {
                    response = basicResponse(h, err, data);
                });
            }
            return response;
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
            return TaskController.addTask(request.payload.description);
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
        method: 'PATCH',
        path: '/todos/{id}',
        handler: async (request, h) => {
            let { state, description } = request.payload || {};
            let result = null;
            await TaskController.updateTask(request.params.id, state, description, function (data, code) {
                result = codeResponse(h, data, code);
            });
            return result;
        },
        options: {
            validate: {
                payload: Joi.object({
                    state: Joi.boolean(),
                    description: Joi.string().min(1).max(255)
                },
                    {
                        params: Joi.object({
                            id: Joi.number().integer()
                        })
                    })
            }
        }
    },
    {
        method: 'DELETE',
        path: '/todos/{id}',
        handler: async (request, h) => {
            let result = null
            await TaskController.removeTask(request.params.id, function (data, code) {
                result = codeResponse(h, data, code);
            });
            return result;
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