import { NotFound } from 'http-errors';
import { Product } from '../archetypes/interfaces';

export const PRODUCTS: Product[] = [
  {
    description: 'Short Product Description1',
    id: '7567ec4b-b10c-48c5-9345-fc73c48a80aa',
    price: 2.4,
    title: 'ProductOne',
  },
  {
    description: 'Short Product Description3',
    id: '7567ec4b-b10c-48c5-9345-fc73c48a80a0',
    price: 10,
    title: 'ProductNew',
  },
  {
    description: 'Short Product Description2',
    id: '7567ec4b-b10c-48c5-9345-fc73c48a80a2',
    price: 23,
    title: 'ProductTop',
  },
  {
    description: 'Short Product Description7',
    id: '7567ec4b-b10c-48c5-9345-fc73c48a80a1',
    price: 15,
    title: 'ProductTitle',
  },
  {
    description: 'Short Product Description2',
    id: '7567ec4b-b10c-48c5-9345-fc73c48a80a3',
    price: 23,
    title: 'Product',
  },
  {
    description: 'Short Product Description4',
    id: '7567ec4b-b10c-48c5-9345-fc73348a80a1',
    price: 15,
    title: 'ProductTest',
  },
  {
    description: 'Short Product Descriptio1',
    id: '7567ec4b-b10c-48c5-9445-fc73c48a80a2',
    price: 23,
    title: 'Product2',
  },
  {
    description: 'Short Product Description7',
    id: '7567ec4b-b10c-45c5-9345-fc73c48a80a1',
    price: 15,
    title: 'ProductName',
  },
];

class ProductsService {
  private products: Product[];

  constructor() {
    this.products = PRODUCTS;
  }

  async getProducts(): Promise<Product[]> {
    return this.products;
  }

  async getProductById(productId: string): Promise<Product> {
    const product = this.products.find(({ id }) => id === productId);
    if (!product) {
      throw new NotFound(`product with id: ${productId} not found`);
    }

    return product;
  }
}

export default ProductsService;
