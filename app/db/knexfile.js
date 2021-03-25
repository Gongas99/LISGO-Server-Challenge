dotenv = require('dotenv').config()

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgresql://localhost:5432/challenge_db',
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
