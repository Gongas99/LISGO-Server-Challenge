'use strict';

const UserController = require('../controllers/user.controller');
const Joi = require('joi');
const { basicResponse, codeResponse } = require('../helpers/responseHelper')

module.exports = [
    {
        method: 'GET',
        path: '/users/{id}',
        handler: async (request, h) => {
            let response = null
            await UserController.getUserById(request.params.id, function (err, data) {
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
        path: '/users',
        handler: async (request, h) => {
            let response = null
            await UserController.getAllUsers(function (err, data) {
                response = basicResponse(h, err, data);
            });
            return response;
        }
    },
    {
        method: 'PUT',
        path: '/users',
        handler: async (request, h) => {
            let { name, surname, password, roleId } = request.payload;
            let response = null
            await UserController.addUser(name, surname, password, roleId, function (err, data) {
                response = basicResponse(h, err, data);
            });
            return response;
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