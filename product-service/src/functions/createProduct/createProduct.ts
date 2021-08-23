import { APIGatewayEvent } from 'aws-lambda';
import formatJSONResponse from '@libs/apiGateway';
import { ProductsService } from '../../services';
import DataBaseClient from '../../services/db-client.service';

const createProduct = async (event: APIGatewayEvent) => {
  const productService = new ProductsService(DataBaseClient.getClient());
  const body = event.body as any;
  return formatJSONResponse(await productService.createProduct(body));
};

export default createProduct;
