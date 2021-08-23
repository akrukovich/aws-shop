import { HttpError } from 'http-errors';
import statusCodes from 'http-status-codes';
import { APIGatewayProxyResult } from 'aws-lambda';
import formatJSONResponse from '@libs/apiGateway';
import logger from './log.service';
import PayloadValidationError from '../errors/payload-validation.error';

class ErrorsService {
  static handleClientError(error: Error): APIGatewayProxyResult {
    logger.error(error.stack);

    const baseResponse = {
      headers: {
        'ACCESS-CONTROL-ALLOW-ORIGIN': '*',
      },
    };

    const { message } = error;

    if (error instanceof PayloadValidationError) {
      const { statusCode, scope, details } = error;
      return {
        ...formatJSONResponse({ message, scope, details }, statusCode),
        ...baseResponse,
      };
    }

    if (error instanceof HttpError) {
      const { statusCode } = error;
      return {
        ...formatJSONResponse({ message }, statusCode),
        ...baseResponse,
      };
    }

    return {
      ...formatJSONResponse({ message }, statusCodes.INTERNAL_SERVER_ERROR),
      ...baseResponse,
    };
  }
}
export default ErrorsService;
