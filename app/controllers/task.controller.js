const Task = require('../models/task.model');

module.exports = {
    /**
     * 
     * @param {*} id 
     * @returns 
     */
    getTaskById: async function (id) {
        try{
            let task = await Task.query().findById(id);
            return task;
        }
        catch{
            console.log('errou');
            //TODO complementar os catches
        }
    },

    getAllTasks: async function () {
        try{
            let tasks = await Task.query();
            return tasks;
        }
        catch{
            console.log('erro')
        }
    },

    addTask: async function(description){
        try{

        }
        catch{
            
        }
    }
}
