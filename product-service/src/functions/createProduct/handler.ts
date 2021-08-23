import 'source-map-support/register';
import middyfy from '@libs/lambda';

import createProduct from './createProduct';
import { createProductSchema } from '../../schemas/products.schema';
import PayloadValidationService from '../../services/payload-validation.service';

const validation = new PayloadValidationService();
const main = middyfy(createProduct);
main.before(async (res) => {
  validation.validatePayload(res.event.body, createProductSchema);
});

export default main;
