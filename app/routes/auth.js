'use strict';

const AuthController = require('../controllers/auth.controller');
const Joi = require('joi');

module.exports = [
    {
        method: 'POST',
        path: '/login',
        handler: async (request, h) => {
            const { name, password } = request.payload;
            try{
                const {data, code} = await AuthController.login(name, password)
                return h.response({
                    success: true,
                    data: data || {}
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
        path: '/logout',
        handler: (request, h) => {
            request.auth.session.clear();
            return h.response({
                success: true,
                data: {}
            }).code(200);
            return response;
        }
    }
]