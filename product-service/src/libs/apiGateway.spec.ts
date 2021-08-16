import formatJSONResponse from './apiGateway';

describe('formatJSONResponse', () => {
  const message = 'message';

  it('should return the default response with 200 status code', () => {
    const result = formatJSONResponse({ message });
    expect(result).toEqual({ statusCode: 200, body: JSON.stringify({ message }) });
  });

  it('should return the response with 400 status code', () => {
    const result = formatJSONResponse({ message }, 400);
    expect(result).toEqual({ statusCode: 400, body: JSON.stringify({ message }) });
  });
});
