export const AppConfig = {
  production: true,
  environment: 'PROD',
  knex: {
    client: 'sqlite3',
    filename: 'database.sqlite',
  },
};
