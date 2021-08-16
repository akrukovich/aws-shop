import formatJSONResponse from '@libs/apiGateway';
import { ProductsService } from '../../services';

const productService = new ProductsService();
const getProductsList = async () => formatJSONResponse(await productService.getProducts());

export default getProductsList;
