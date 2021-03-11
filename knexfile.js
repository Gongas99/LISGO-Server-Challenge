module.exports = {
    development: {
        client: 'pg',
        connection: process.env.PG_CONNECTION_STRING,
        searchPath: ['knex', 'public'],
        migrations: {
            directory: __dirname + '/db/migrations'
          },
          seeds: {
            directory: __dirname + '/db/seeds/development'
          }
    }
};