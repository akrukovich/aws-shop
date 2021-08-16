import handlerPath from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.default`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products',
        documentation: {
          summary: 'Get products list',
          description: 'Return the whole list of products',
          methodResponses: [
            {
              statusCode: '200',
              responseModels: {
                'application/json': 'ProductsResponse',
              },
            },
          ],
        },
      },
    },
  ],
};
