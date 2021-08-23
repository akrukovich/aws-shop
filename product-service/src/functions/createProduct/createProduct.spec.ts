import createProduct from './createProduct';

jest.mock('../../services', () => {
  const mockClient = {
    createProduct: jest.fn()
      .mockReturnValue({ id: 'id' }),
  };
  return { ProductsService: jest.fn(() => mockClient) };
});

describe('createProduct', () => {
  it('should create a product', async () => {
    const event = { body: {} } as any;
    const result = await createProduct(event);
    expect(result.statusCode).toBe(200);
  });
});
