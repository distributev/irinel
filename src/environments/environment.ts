export const AppConfig = {
  production: false,
  environment: 'LOCAL',
  knex: {
    client: 'sqlite3',
    filename: 'database.sqlite',
  },
};
