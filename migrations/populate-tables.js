const format = require('pg-format');
const client = require('./db-client');

const products = [
    ['AK-47 Redline', 'The metal parts of the rifle are adorned with a pattern imitating carbon fiber', 15],
    ['M4A1-S Player Two', 'The skin is made in the manga style', 45],
    ['AWS Dragon Lore', 'The most famous skin', 2000],
]

const populateProducts = async () => {
    await client.query(format('INSERT INTO products (title, description, price) VALUES %L',products));
}

const selectProducts = async () => {
    const res = await client.query('select id from products;');
    return res.rows;
}

const populateStocks = async (productsIds) => {
    const stocks = productsIds.map(({id})=> [id, Math.floor(Math.random() * 10) + 1])
    await client.query(format('INSERT INTO stocks (product_id, count) VALUES %L',stocks));
}


const main = async () => {
    try {
        await client.connect();
        await populateProducts();
        const ids = await selectProducts();
        await populateStocks(ids);
        console.log('Tables populated!');
    } catch (e) {
        console.log('Error during tables population:', e);
    } finally {
        await client.end();
    }
};

main();
