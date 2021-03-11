const basic = require('./basic');
const tasks = require('./tasks');
const users = require('./users')

module.exports = [].concat(basic, tasks, users);