import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import cors from '@middy/http-cors';
import inputOutputLogger from '@middy/input-output-logger';
import ErrorService from '../services/errors.service';

const middyfy = (handler) => middy(handler)
  .use(inputOutputLogger())
  .use(middyJsonBodyParser())
  .use(cors())
  .onError((request) => {
    request.response = ErrorService.handleClientError(request.error as any);
  });

export default middyfy;
