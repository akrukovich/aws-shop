import getProductById from './getProductById';

describe('getProductById', () => {
  it('should return one product response', async () => {
    const event = { pathParameters: { id: '7567ec4b-b10c-45c5-9345-fc73c48a80a1' } } as any;
    const result = await getProductById(event);
    expect(result.statusCode).toBe(200);
  });

  it('should throw an error if product not found', async () => {
    const event = { pathParameters: { id: '7567ec4b-b1-45c5-9345-fc73c48a80a1' } } as any;
    await expect(async () => {
      await getProductById(event);
    }).rejects.toThrow();
  });
});
