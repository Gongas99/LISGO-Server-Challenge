'use strict';

const UserController = require('../controllers/user.controller');
const Joi = require('joi');

module.exports = [
    /**
     * GET Route that returns a user from the given id
     */
    {
        method: 'GET',
        path: '/users/{id}',
        handler: async (request, h) => {
            try {
                const response = await UserController.getUserById(request.params.id)
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
                params: Joi.object({
                    id: Joi.number().required().integer()
                })
            }
        }
    },
    /**
     * GET Route that returns every user in the system
     */
    {
        method: 'GET',
        path: '/users',
        handler: async (request, h) => {
            try {
                const response = await UserController.getAllUsers();
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
            }
        }
    },
    /**
     * PUT Route that inserts a new user in the system with the given information
     */
    {
        method: 'PUT',
        path: '/users',
        handler: async (request, h) => {
            let { name, surname, password, roleId } = request.payload || {};
            try{
                const response = await UserController.addUser(name, surname, password, roleId);
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
            auth: false,
            validate: {
                payload: Joi.object({
                    name: Joi.string().required().min(1).max(255),
                    surname: Joi.string().required().min(1).max(255),
                    password: Joi.string().required().min(6).max(64),
                    roleId: Joi.number().required().integer()
                })
            }
        }
    },
]