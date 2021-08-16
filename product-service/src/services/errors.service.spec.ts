import { NotFound } from 'http-errors';
import * as formatJSONResponse from '@libs/apiGateway';
import { ErrorService } from './index';

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

  describe('handleHttpError', () => {
    const message = 'message';
    it('should return http error response', () => {
      const error = new NotFound(message);
      const { statusCode } = ErrorService.handleHttpError(error);
      expect(statusCode).toBe(404);
      expect(spyFormatJSONResponse).toBeCalledWith({ message }, statusCode);
    });
    it('should return internal error response', () => {
      const error = new Error(message);
      const { statusCode } = ErrorService.handleHttpError(error);
      expect(statusCode).toBe(500);
      expect(spyFormatJSONResponse).toBeCalledWith({ message }, statusCode);
    });
  });
});
