const { Model } = require('objection');

class User extends Model {
    static get tableName() {
        return 'user';
    };

    static get idColumn() {
        return 'id';
    };
    
    static get relationMappings(){
        const Task = require('../models/task.model');

        return {
            tasks: {
                relation: Model.HasManyRelation,
                modelClass: Task,
                join: {
                    from: 'task.userId',
                    to: 'user.id'
                }
            }
        }
    };
}

module.exports = User;