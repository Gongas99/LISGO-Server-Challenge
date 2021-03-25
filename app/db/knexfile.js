dotenv = require('dotenv').config()

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgresql://u9ntenigayo2a6qaukm0:NvsJfEOEYbCCtlLQYjfY@b2awe9iuvpwzq0in1qhv-postgresql.services.clever-cloud.com:5432/b2awe9iuvpwzq0in1qhv',
    ssl: { rejectUnauthorized: false },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  },

};
