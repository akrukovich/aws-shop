import getProductsList from './getProductsList';

jest.mock('../../services', () => {
  const mockClient = {
    getProducts: jest.fn().mockReturnValueOnce([{ id: 'id' }]),
  };
  return { ProductsService: jest.fn(() => mockClient) };
});

describe('getProductsList', () => {
  it('should return all the products response', async () => {
    const result = await getProductsList();
    expect(result.statusCode).toBe(200);
    expect(result.body).toBe(JSON.stringify([{ id: 'id' }]));
  });
});
