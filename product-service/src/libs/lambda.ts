import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import cors from '@middy/http-cors';
import ErrorService from '../services/errors.service';

const middyfy = (handler) => middy(handler)
  .use(middyJsonBodyParser())
  .use(cors())
  .onError((request) => ErrorService.handleHttpError(request.error));

export default middyfy;
