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
        const Role = require('../models/role.model')
        return {
            tasks: {
                relation: Model.HasManyRelation,
                modelClass: Task,
                join: {
                    from: 'task.userId',
                    to: 'user.id'
                }
            },
            role: {
                relation: Model.HasOneRelation,
                modelClass: Role,
                join: {
                    from: 'user.roleId',
                    to: 'role.id'
                }
            }
        }
    };
}

module.exports = User;