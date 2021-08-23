import { NotFound } from 'http-errors';
import * as formatJSONResponse from '@libs/apiGateway';
import { ErrorService } from './index';
import PayloadValidationError from '../errors/payload-validation.error';

const spyFormatJSONResponse = jest.spyOn(formatJSONResponse, 'default');

let sut:any;

beforeEach(() => {
  sut = new ErrorService();
});

afterEach(() => {
  sut = null;
  jest.clearAllMocks();
});

describe('ErrorService', () => {
  describe('Instantiation', () => {
    it('should be an ErrorService instance', () => {
      expect(sut).toBeDefined();
      expect(sut).toBeInstanceOf(ErrorService);
    });
  });

  describe('handleClientError', () => {
    const message = 'message';

    it('should return PayloadValidationError response', () => {
      const ajvErrorObject = {
        instancePath: 'path',
        message: 'message',
      };
      const ajvErrors = [
        ajvErrorObject,
      ] as any;
      const error = new PayloadValidationError(ajvErrors);
      const { statusCode } = ErrorService.handleClientError(error);
      expect(statusCode).toBe(400);
      expect(spyFormatJSONResponse).toBeCalledWith({
        message: 'Bad Request',
        details: [{ detail: ajvErrorObject.message, instancePath: ajvErrorObject.instancePath }],
        scope: 'validation',
      }, statusCode);
    });

    it('should return HttpError response', () => {
      const error = new NotFound(message);
      const { statusCode } = ErrorService.handleClientError(error);
      expect(statusCode).toBe(404);
      expect(spyFormatJSONResponse).toBeCalledWith({ message }, statusCode);
    });

    it('should return internal error response', () => {
      const error = new Error(message);
      const { statusCode } = ErrorService.handleClientError(error);
      expect(statusCode).toBe(500);
      expect(spyFormatJSONResponse).toBeCalledWith({ message }, statusCode);
    });
  });
});
