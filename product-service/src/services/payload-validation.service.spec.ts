import PayloadValidationService from './payload-validation.service';
import { createProductSchema } from '../schemas/products.schema';
import PayloadValidationError from '../errors/payload-validation.error';

let sut:any;

beforeEach(() => {
  sut = new PayloadValidationService();
});

afterEach(() => {
  sut = null;
  jest.clearAllMocks();
});

describe('PayloadValidationService', () => {
  describe('Instantiation', () => {
    it('should be an PayloadValidationService instance', () => {
      expect(sut).toBeDefined();
      expect(sut).toBeInstanceOf(PayloadValidationService);
    });
  });

  describe('validatePayload', () => {
    it('should not throw for a valid payload', () => {
      const payload = {
        title: 'title',
        description: 'desc',
        price: 10,
        count: 2,
      };
      expect(() => sut.validatePayload(payload, createProductSchema)).not.toThrow();
    });

    it('should throw for an invalid payload', () => {
      const payload = {
        title: 11,
        description: 'desc',
        price: 10,
        count: '2',
      };
      expect(() => sut.validatePayload(payload, createProductSchema))
        .toThrowError(PayloadValidationError);
    });
  });
});
