const knex = require('knex');
const knexfile = require('../db/knexfile')
const { Model } = require('objection');

/**
 * Function that sets up the knex configuration and the models in the system
 */
function setupDb() {
    const db = knex(knexfile.development)
    Model.knex(db)
}

module.exports = setupDb;
