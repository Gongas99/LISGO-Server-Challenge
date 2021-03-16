const auth = require('./auth');
const tasks = require('./tasks');
const users = require('./users')

module.exports = [].concat(auth, tasks, users);