import { Client } from 'pg';

class DataBaseClient {
  static getClient(): Client {
    return new Client({
      user: process.env.DB_USER_AWS,
      host: process.env.DB_HOST_AWS,
      database: process.env.DB_NAME_AWS,
      password: process.env.DB_PASSWORD_AWS,
      port: +process.env.DB_PORT_AWS,
      ssl: {
        rejectUnauthorized: false,
      },
      connectionTimeoutMillis: 5000,
    });
  }
}

export default DataBaseClient;
