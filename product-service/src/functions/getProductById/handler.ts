import 'source-map-support/register';
import middyfy from '@libs/lambda';

import getProductsById from './getProductById';

export default middyfy(getProductsById);
