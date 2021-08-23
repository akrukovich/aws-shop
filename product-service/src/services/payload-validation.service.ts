import Ajv from 'ajv';
import PayloadValidationError from '../errors/payload-validation.error';

class PayloadValidationService {
  private ajv: Ajv;

  constructor() {
    this.ajv = new Ajv({ allErrors: true });
  }

  validatePayload(payload:any, schema: object): void {
    const validate = this.ajv.compile(schema);
    const isValid = validate(payload);

    if (!isValid) {
      throw new PayloadValidationError(validate.errors);
    }
  }
}

export default PayloadValidationService;
