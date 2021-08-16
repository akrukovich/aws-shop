import { NotFound } from 'http-errors';
import { ProductsService } from './index';
import { PRODUCTS } from './products.service';

let sut:any;

beforeEach(() => {
  sut = new ProductsService();
});

afterEach(() => {
  sut = null;
  jest.clearAllMocks();
});

describe('ProductsService', () => {
  describe('Instantiation', () => {
    it('should be an ProductsService instance', () => {
      expect(sut).toBeDefined();
      expect(sut).toBeInstanceOf(ProductsService);
    });
  });

  describe('getProducts', () => {
    it('should return all products', async () => {
      const products = await sut.getProducts();
      expect(products).toEqual(PRODUCTS);
    });
  });

  describe('getProductById', () => {
    it('should return one product', async () => {
      const id = '7567ec4b-b10c-48c5-9445-fc73c48a80a2';
      const result = await sut.getProductById(id);
      expect(result).toEqual(PRODUCTS.find((product) => product.id === id));
    });

    it('should throw 404 error if a product not found', async () => {
      const id = '7567ec4b-b10c5-9445-fc73c48a80a2';
      await expect(async () => {
        await sut.getProductById(id);
      }).rejects.toThrowError(NotFound);
    });
  });
});
