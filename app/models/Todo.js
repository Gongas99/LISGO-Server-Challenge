const { Model } = require('objection');

// TODO model
class Todo extends Model {
    static get tableName() {
        return 'todo';
    }

    static get idColumn() {
        return 'id';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['description'],

            properties: {
                id: { type: 'integer' },
                state: { type: ['boolean'] },
                description: { type: 'string', minLength: 1, maxLength: 255 },
                dateAdded: { type: 'string', minLength: 1, maxLength: 255 }
            }
        };
    }

}