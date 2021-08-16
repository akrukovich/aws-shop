import handlerPath from './handlerResolver';

const spy = jest.spyOn(process, 'cwd');
spy.mockReturnValue('aws-shop\\product-services');

const PATH = 'aws-shop\\product-services\\src\\libs';

describe('handlerPath', () => {
  const result = handlerPath(PATH);
  it('should be src/libs', () => {
    expect(result).toEqual('src/libs');
  });
});
