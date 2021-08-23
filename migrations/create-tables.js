const client = require('./db-client');

const createProductsTable = async () => {
    await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    await client.query(`
CREATE TABLE IF NOT EXISTS products (
        id uuid DEFAULT uuid_generate_v4(),
        title text NOT NULL,
        description text,
        price integer,
        PRIMARY KEY (id)
                                    )`);
};

const createStocksTable = async () => {
    await client.query(`
CREATE TABLE IF NOT EXISTS stocks (
        product_id uuid,
        count integer
                                  )`);
};

const addStocksForeignKey = async () => {
    await client.query(`
ALTER TABLE stocks DROP CONSTRAINT IF EXISTS  fk_products;
ALTER TABLE stocks ADD CONSTRAINT fk_products FOREIGN KEY (product_id) REFERENCES products (id);`
    );
};

const main = async () => {
    try {
        await client.connect();
        await createProductsTable();
        await createStocksTable();
        await addStocksForeignKey();
    } catch (e) {
        console.log('Error during tables creation:', e);
    } finally {
        await client.end();
        console.log('Tables created!');
    }
};

main();
