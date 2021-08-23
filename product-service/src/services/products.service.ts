import { NotFound } from 'http-errors';
import { Client } from 'pg';
import { Product, Stock } from '../archetypes/interfaces';

export type ProductsStocksQuery = Product & Stock;

class ProductsService {
  private db: Client;

  constructor(client: Client) {
    this.db = client;
  }

  async getProducts(): Promise<ProductsStocksQuery[]> {
    await this.db.connect();
    const { rows } = await this.db.query(`SELECT products.id,products.title,products.description,products.price,stocks.count
    FROM products
    INNER JOIN stocks ON products.id=stocks.product_id;`);

    await this.db.end();

    return rows;
  }

  async getProductById(productId: string): Promise<ProductsStocksQuery> {
    await this.db.connect();
    const { rows: [product] } = await this.db.query(`SELECT products.id,products.title,products.description,products.price,stocks.count
    FROM products
    INNER JOIN stocks ON products.id=stocks.product_id
    Where products.id::text = '${productId}';
    `);

    await this.db.end();

    if (!product) {
      throw new NotFound(`product with id: ${productId} not found`);
    }

    return product;
  }

  async createProduct({
    title, description, price, count,
  }: ProductsStocksQuery): Promise<ProductsStocksQuery> {
    await this.db.connect();
    try {
      await this.db.query('BEGIN');

      const queryProductText = 'INSERT INTO products (title, description, price) VALUES($1,$2,$3) RETURNING id, title, description, price';
      const { rows: [product] } = await this.db.query(
        queryProductText,
        [title, description, price],
      );

      const insertStocksText = 'INSERT INTO stocks(product_id, count) VALUES ($1, $2) RETURNING count';
      await this.db.query(insertStocksText, [product.id, count]);

      await this.db.query('COMMIT');

      return { ...product, count };
    } catch (e) {
      await this.db.query('ROLLBACK');
      throw e;
    } finally {
      await this.db.end();
    }
  }
}

export default ProductsService;
