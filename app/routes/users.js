'use strict';

const UserController = require('../controllers/user.controller');
const Joi = require('joi');

module.exports = [
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
            validate: {
                params: Joi.object({
                    id: Joi.number().integer()
                })
            }
        }
    },
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
            auth: {
                scope: ['admin']
            }
        }
    },
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
            auth: false,
            validate: {
                payload: Joi.object({
                    name: Joi.string().min(1).max(255),
                    surname: Joi.string().min(1).max(255),
                    password: Joi.string().min(6).max(64),
                    roleId: Joi.number().integer()
                })
            }
        }
    },
]