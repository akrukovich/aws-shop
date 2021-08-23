import handlerPath from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.default`,
  events: [
    {
      http: {
        method: 'post',
        path: 'products',
        documentation: {
          summary: 'Post a new single product',
          description: 'Create a new product',
          requestModels: {
            'application/json': 'ProductCreate',
          },
          methodResponses: [
            {
              statusCode: '200',
              responseModels: {
                'application/json': 'ProductResponse',
              },
            },
          ],
        },
      },
    },
  ],
};
