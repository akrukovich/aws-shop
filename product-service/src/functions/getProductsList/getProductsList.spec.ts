import getProductsList from './getProductsList';
import { PRODUCTS } from '../../services/products.service';

describe('getProductsList', () => {
  it('should return all the products response', async () => {
    const result = await getProductsList();
    expect(result.statusCode).toBe(200);
    expect(result.body).toBe(JSON.stringify(PRODUCTS));
  });
});
