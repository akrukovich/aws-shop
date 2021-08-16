import { APIGatewayEvent } from 'aws-lambda';
import formatJSONResponse from '@libs/apiGateway';
import { ProductsService } from '../../services';

const productService = new ProductsService();

const getProductById = async (event: APIGatewayEvent) => {
  const { id } = event.pathParameters;
  return formatJSONResponse(await productService.getProductById(id));
};

export default getProductById;
