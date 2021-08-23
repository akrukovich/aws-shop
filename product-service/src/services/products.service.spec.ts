import { NotFound } from 'http-errors';
import { Client } from 'pg';
import { ProductsService } from './index';

jest.mock('pg', () => {
  const mockClient = {
    connect: jest.fn(),
    query: jest.fn()
      .mockReturnValue({
        rows: [{
          id: '286287ab-47ac-424c-b041-66d44e6cc670',
          title: 'AK-47 Redline',
          description: 'The metal parts of the rifle are adorned with a pattern imitating carbon fiber',
          price: 15,
          count: 3,
        }],
      })
      .mockReturnValueOnce({
        rows: [
          {
            id: '286287ab-47ac-424c-b041-66d44e6cc670',
            title: 'AK-47 Redline',
            description: 'The metal parts of the rifle are adorned with a pattern imitating carbon fiber',
            price: 15,
            count: 3,
          }],
      })
      .mockReturnValueOnce({
        rows: [
          {
            id: '286287ab-47ac-424c-b041-66d44e6cc670',
            title: 'AK-47 Redline',
            description: 'The metal parts of the rifle are adorned with a pattern imitating carbon fiber',
            price: 15,
            count: 3,
          }],
      })
      .mockReturnValueOnce({
        rows: [],
      }),
    end: jest.fn(),
  };
  return { Client: jest.fn(() => mockClient) };
});

let sut:any;
let client;
beforeEach(() => {
  client = new Client();
  sut = new ProductsService(client);
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
      const spyConnect = jest.spyOn(client, 'connect');
      const spyEnd = jest.spyOn(client, 'end');
      const products = await sut.getProducts();
      expect(products).toEqual([
        {
          id: '286287ab-47ac-424c-b041-66d44e6cc670',
          title: 'AK-47 Redline',
          description: 'The metal parts of the rifle are adorned with a pattern imitating carbon fiber',
          price: 15,
          count: 3,
        }]);
      expect(spyConnect).toHaveBeenCalled();
      expect(spyEnd).toHaveBeenCalled();
    });
  });

  describe('getProductById', () => {
    it('should return one product', async () => {
      const spyConnect = jest.spyOn(client, 'connect');
      const spyEnd = jest.spyOn(client, 'end');

      const id = '286287ab-47ac-424c-b041-66d44e6cc670';
      const result = await sut.getProductById(id);
      expect(result).toEqual(
        {
          id: '286287ab-47ac-424c-b041-66d44e6cc670',
          title: 'AK-47 Redline',
          description: 'The metal parts of the rifle are adorned with a pattern imitating carbon fiber',
          price: 15,
          count: 3,
        },
      );
      expect(spyConnect).toHaveBeenCalled();
      expect(spyEnd).toHaveBeenCalled();
    });

    it('should throw 404 error if a product not found', async () => {
      const id = '7567ec4b-b10c5-9445-fc73c48a80a2';
      await expect(async () => {
        await sut.getProductById(id);
      }).rejects.toThrowError(NotFound);
    });
  });

  describe('createProduct', () => {
    it('should create a product', async () => {
      const spyConnect = jest.spyOn(client, 'connect');
      const spyEnd = jest.spyOn(client, 'end');

      const result = await sut.createProduct({
        title: 'AK-47 Redline',
        description: 'The metal parts of the rifle are adorned with a pattern imitating carbon fiber',
        price: 15,
        count: 3,
      });
      expect(result).toEqual(
        {
          id: '286287ab-47ac-424c-b041-66d44e6cc670',
          title: 'AK-47 Redline',
          description: 'The metal parts of the rifle are adorned with a pattern imitating carbon fiber',
          price: 15,
          count: 3,
        },
      );
      expect(spyConnect).toHaveBeenCalled();
      expect(spyEnd).toHaveBeenCalled();
    });
  });
});
