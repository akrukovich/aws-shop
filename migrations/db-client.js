const { Client } = require('pg');
const client = new Client({
    user: process.env.DB_USER_AWS,
    host: process.env.DB_HOST_AWS,
    database: process.env.DB_NAME_AWS || 'productsDB',
    password: process.env.DB_PASSWORD_AWS,
    port: process.env.DB_PORT_AWS || 5432,
    ssl: {
        rejectUnauthorized:false
    },
    connectionTimeoutMillis: 5000
});

module.exports = client;


