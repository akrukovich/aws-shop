import { APIGatewayEvent } from 'aws-lambda';
import formatJSONResponse from '@libs/apiGateway';
import { ProductsService } from '../../services';
import DataBaseClient from '../../services/db-client.service';

const getProductById = async (event: APIGatewayEvent) => {
  const productService = new ProductsService(DataBaseClient.getClient());
  const { id } = event.pathParameters;
  return formatJSONResponse(await productService.getProductById(id));
};

export default getProductById;
