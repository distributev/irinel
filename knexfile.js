module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: 'database.sqlite'
    },
    migrations: {
      directory: './src/migrations'
    }
  },
  production: {
    client: 'sqlite3',
    connection: {
      filename: './playground/db/database.sqlite'
    },
    migrations: {
      directory: './src/migrations'
    }
  }
};
