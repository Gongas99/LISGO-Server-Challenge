'use strict';

const AuthController = require('../controllers/auth.controller');
const Joi = require('joi');

/**
 * Authorization routes
 */
module.exports = [
    /**
     * POST route that receives a user and password, validates the information 
     * and returns the user with the accessCode if success or the respective error code
     */
    {
        method: 'POST',
        path: '/login',
        handler: async (request, h) => {
            const { name, password } = request.payload;
            try{
                const {data, code} = await AuthController.login(name, password)
                return h.response({
                    success: code === 200 ? true : false,
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
            tags: ['api'],
            auth: false,
            validate: {
                payload: Joi.object({
                    name: Joi.string().required().min(1).max(255),
                    password: Joi.string().required().min(1).max(255),
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
        }
    }
]