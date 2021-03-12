module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'challenge_db',
      user:     'goncalopatrocinio',
      password: null
    },
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
