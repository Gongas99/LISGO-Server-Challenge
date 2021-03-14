'use strict';

const UserController = require('../controllers/user.controller');
const Joi = require('joi');
const { basicResponse, codeResponse } = require('../helpers/responseHelper')

module.exports = [
    {
        method: 'GET',
        path: '/user/{id}',
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
]