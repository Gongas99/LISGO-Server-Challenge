const { Model } = require('objection');

class Task extends Model {
    static get tableName() {
        return 'task';
    }

    static get idColumn() {
        return 'id';
    }
}

module.exports = Task;