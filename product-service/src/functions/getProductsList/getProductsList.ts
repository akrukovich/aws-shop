import formatJSONResponse from '@libs/apiGateway';
import { ProductsService } from '../../services';
import DataBaseClient from '../../services/db-client.service';

const getProductsList = async () => {
  const productService = new ProductsService(DataBaseClient.getClient());
  return formatJSONResponse(await productService.getProducts());
};

export default getProductsList;
