const basic = require('./basic');
const todos = require('./todos');
const users = require('./users')

module.exports = [].concat(basic, todos, users);