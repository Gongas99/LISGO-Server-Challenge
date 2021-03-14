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

    static get relationMappings(){
        const User = require('../models/user.model');

        return {
            user: {
                relation: Model.HasOneRelation,
                modelClass: User,
                join: {
                    from: 'task.userId',
                    to: 'user.id'
                }
            }
        }
    };
}

module.exports = Task;