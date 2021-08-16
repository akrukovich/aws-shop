import 'source-map-support/register';
import middyfy from '@libs/lambda';
import getProductsList from './getProductsList';

export default middyfy(getProductsList);
