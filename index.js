'use strict';

require('dotenv').config()
const Hapi = require('@hapi/hapi');
const routes = require('./app/routes');
const hapiAuthJwt2 = require('hapi-auth-jwt2')
const auth = require('./app/auth')
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');

const dbSetup = require('./app/db/dbSetup');
const config = require('./app/config/settings')

const init = async () => {
    //initiallize knex models
    dbSetup();

    const server = Hapi.server({
        port: process.env.PORT || 3001,
        
        routes: {   //enable cors
            cors: {
                origin: ['*']           
            }
        }
    });

    //configure jwt
    await server.register(hapiAuthJwt2);
    server.auth.strategy('jwt', 'jwt', {
        key: config.accessTokenSecret,
        validate: auth.validateJwt
    })
    server.auth.default('jwt');

    //configure swagger
    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: {
                'info': {
                    'title': 'Lisgo Backend Challenge',
                }
            }
        }
    ]); 

    server.route(routes);

    //configure lout
    //await server.register([require('vision'), require('inert'), require('lout')]);

    //then start the sever
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();