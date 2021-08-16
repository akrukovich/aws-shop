import handlerPath from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.default`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products/{id}',
        request: {
          parameters: { paths: { id: true } },
        },
        documentation: {
          summary: 'Get one single product',
          description: 'Return one product by Id',
          methodResponses: [
            {
              statusCode: '200',
              responseModels: {
                'application/json': 'ProductResponse',
              },
            },
            {
              statusCode: '404',
              responseModels: {
                'application/json': '404JsonResponse',
              },
            },
          ],
        },
      },
    },
  ],
};
