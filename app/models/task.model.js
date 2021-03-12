const { Model } = require('objection');

class Task extends Model {
    static get tableName() {
        return 'task';
    }

    static get idColumn() {
        return 'id';
    }

    static get isDone() {
        return this.state;
    }
}

module.exports = Task;