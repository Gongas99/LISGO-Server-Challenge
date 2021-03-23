'use strict';

const TaskController = require('../controllers/task.controller');
const Joi = require('joi');

module.exports = [
    /**
     * GET Route that returns a task from the give id
     */
    {
        method: 'GET',
        path: '/todos/{id}',
        handler: async (request, h) => {
            try {
                const response = await TaskController.getTaskById(request.params.id)
                return h.response({
                    success: true,
                    data: response || {}
                }).code(200);
            }
            catch (err) {
                return h.response({
                    success: false,
                    data: err
                }).code(500);
            }
        },
        options: {
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().required().integer()
                })
            }
        }
    },
    /**
     * GET Route that returns every task with an optional filter and order
     */
    {
        method: 'GET',
        path: '/todos',
        handler: async (request, h) => {
            let { filter, orderBy } = request.payload || {};
            try {
                const response = await TaskController.getAllTasks(filter, orderBy)
                return h.response({
                    success: true,
                    data: response || {}
                }).code(200);
            }
            catch (err) {
                return h.response({
                    success: false,
                    data: err
                }).code(500);
            }
        },
        options: {
            tags: ['api'],
            validate: {
                query: Joi.object({
                    filter: Joi.string().min(1).max(10),
                    orderBy: Joi.string().min(1).max(11),
                })
            }
        }
    },
    /**
     * GET Route that returns every task from a user with an optional filter and order
     */
    {
        method: 'GET',
        path: '/todos/user/{id}',
        handler: async (request, h) => {
            let { filter, orderBy } = request.query || {};
            let userId = parseInt(request.params.id);
            try {
                const response = await TaskController.getTasksByUserId(filter, orderBy, userId)
                return h.response({
                    success: true,
                    data: response || {}
                }).code(200);
            }
            catch (err) {
                return h.response({
                    success: false,
                    data: err
                }).code(500);
            }
        },
        options: {
            auth: {
                scope: ['admin']
            },
            tags: ['api'],
            validate: {
                query: Joi.object({
                    filter: Joi.string().min(1).max(64),
                    orderBy: Joi.string().min(1).max(64),
                })
            }
        }
    },
    /**
    * GET Route that returns every task from the user authenticated
    */
    {
        method: 'GET',
        path: '/todos/user',
        handler: async (request, h) => {
            let { filter, orderBy } = request.query || {};
            let { id } = request.auth.credentials;
            try {
                const response = await TaskController.getTasksByUserId(filter, orderBy, id)
                return h.response({
                    success: true,
                    data: response || {}
                }).code(200);
            }
            catch (err) {
                return h.response({
                    success: false,
                    data: err
                }).code(500);
            }
        },
        options: {
            tags: ['api'],
            validate: {
                query: Joi.object({
                    filter: Joi.string().min(1).max(64),
                    orderBy: Joi.string().min(1).max(64),
                })
            }
        }
    },
    /**
     * PUT Route that inserts a new task to the user that used its credentials
     */
    {
        method: 'PUT',
        path: '/todos',
        handler: async (request, h) => {
            let { description } = request.payload;
            let { id } = request.auth.credentials;
            try {
                const response = await TaskController.addTask(description, id)
                return h.response({
                    success: true,
                    data: response || {}
                }).code(200);
            }
            catch (err) {
                return h.response({
                    success: false,
                    data: err
                }).code(500);
            }
        },
        options: {
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    description: Joi.string().required().min(1).max(255)
                })
            }
        }
    },
    /**
     * PUT Route that inserts a new task to another user
     */
    {
        method: 'PUT',
        path: '/todos/user/{id}',
        handler: async (request, h) => {
            let { description } = request.payload;
            let { id } = request.params;
            try {
                const response = await TaskController.addTask(description, id)
                return h.response({
                    success: true,
                    data: response || {}
                }).code(200);
            }
            catch (err) {
                return h.response({
                    success: false,
                    data: err
                }).code(500);
            }
        },
        options: {
            tags: ['api'],
            auth: {
                scope: ['admin']
            },
            validate: {
                payload: Joi.object({
                    description: Joi.string().required().min(1).max(255)
                }),
                params: Joi.object({
                    id: Joi.number().required().integer()
                })
            }
        }
    },
    /**
     * PATCH Route that edits the task from the id provided and the new information received
     */
    {
        method: 'PATCH',
        path: '/todos/{id}',
        handler: async (request, h) => {
            let { state, description } = request.payload || {};
            try {
                const { task, code } = await TaskController.updateTask(request.params.id, state, description)
                return h.response({
                    success: true,
                    data: task || {}
                }).code(code);
            }
            catch (err) {
                return h.response({
                    success: false,
                    data: err
                }).code(500);
            }
        },
        options: {
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    state: Joi.boolean(),
                    description: Joi.string().min(1).max(255)
                },
                    {
                        params: Joi.object({
                            id: Joi.number().required().integer()
                        })
                    })
            }
        }
    },
    /**
     * DELETE Route that deletes the task from the id provided
     */
    {
        method: 'DELETE',
        path: '/todos/{id}',
        handler: async (request, h) => {
            try {
                const { task, code } = await TaskController.removeTask(request.params.id)
                return h.response({
                    success: true,
                    data: task || {}
                }).code(code);
            }
            catch (err) {
                return h.response({
                    success: false,
                    data: err
                }).code(500);
            }
        },
        options: {
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().required().integer()
                })
            }
        }
    }
]