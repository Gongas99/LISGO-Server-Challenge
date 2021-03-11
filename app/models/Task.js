const { Model } = require('objection');
const knex = require('../db/knex')

Model.knex(knex)

// Task model
class Task extends Model {
    static get tableName() {
        return 'task';
    }

    static get idColumn() {
        return 'id';
    }

    
}