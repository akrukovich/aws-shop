import { BadRequest } from 'http-errors';
import { ErrorObject } from 'ajv';
import { Scope } from '../archetypes/enums';

class PayloadValidationError extends BadRequest {
  readonly scope: string = Scope.Validation;

  readonly details: { instancePath: string, detail:string }[];

  constructor(ajvErrors: ErrorObject[]) {
    super();
    this.details = ajvErrors
      .map(({ instancePath, message }) => ({ instancePath, detail: message }));
    Object.setPrototypeOf(this, PayloadValidationError.prototype);
  }
}

export default PayloadValidationError;
