dotenv = require('dotenv').config()

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://nnxkiimxfxzcmk:08b7a69b46aa60a79cce5f7beb15a3ed123d2592e0edb2db79bfc064d41cef40@ec2-54-155-35-88.eu-west-1.compute.amazonaws.com:5432/deq7mg7rm5v80g?ssl=true',
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
