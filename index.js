'use strict';

const Hapi = require('@hapi/hapi');
const routes = require('./app/routes');

const dbSetup = require('./app/db/dbSetup');

const init = async () => {
    //initiallize knex models
    dbSetup();

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

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