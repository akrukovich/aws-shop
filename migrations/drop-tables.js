const client = require('./db-client');

const dropTables = async () => {
  await client.query('DROP TABLE IF EXISTS stocks;');
  await client.query('DROP TABLE IF EXISTS products;');
};

const main = async () => {
    try {
        await client.connect();
        await dropTables();
    } catch (e) {
        console.log('Error during tables dropping:', e);
    } finally {
        await client.end();
        console.log('Tables dropped!');
    }
};

main();
