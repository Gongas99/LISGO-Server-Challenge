'use strict';

const AuthController = require('../controllers/auth.controller');
const { basicResponse, codeResponse } = require('../helpers/responseHelper')
const Joi = require('joi');

module.exports = [
    {
        method: 'POST',
        path: '/login',
        handler: async (request, h) => {
            const {name, password} = request.payload;
            let response = null
            await AuthController.login(name, password, function (err, data) {
                response = basicResponse(h, err, data);
            });
            return response;
        },
        options: {
            auth: false,
            validate: {
                payload: Joi.object({
                    name: Joi.string().min(1).max(255),
                    password: Joi.string().min(1).max(255),
                })
            }
        }
    },
    {
        method: 'POST',
        path:   '/logout',
        handler: (request, h) => {

            return 'Hello world!';
        }
    }
]