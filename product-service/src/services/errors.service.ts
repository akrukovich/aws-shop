import { HttpError } from 'http-errors';
import statusCodes from 'http-status-codes';
import { APIGatewayProxyResult } from 'aws-lambda';
import formatJSONResponse from '@libs/apiGateway';
import logger from './log.service';

class ErrorsService {
  static handleHttpError(error: Error): APIGatewayProxyResult {
    logger.error(error.stack);

    const { message } = error;
    if (error instanceof HttpError) {
      const { statusCode } = error;
      return formatJSONResponse({ message }, statusCode);
    }
    return formatJSONResponse({ message }, statusCodes.INTERNAL_SERVER_ERROR);
  }
}
export default ErrorsService;
