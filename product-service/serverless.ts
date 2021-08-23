import type { AWS } from '@serverless/typescript';

import getProductsList from '@functions/getProductsList';
import getProductById from '@functions/getProductById';
import createProduct from '@functions/createProduct';

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
    documentation: {
      api: {
        info: {
          version: '2',
          title: 'Product API',
          description: 'Nodejs in AWS API',
        },
      },
      models: [
        {
          name: 'ProductResponse',
          contentType: 'application/json',
          schema: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
              },
              title: {
                type: 'string',
              },
              description: {
                type: 'string',
              },
              price: {
                type: 'number',
              },
              count: {
                type: 'number',
              },
            },
          },
        },
        {
          name: 'ProductCreate',
          contentType: 'application/json',
          schema: {
            type: 'object',
            properties: {
              title: {
                type: 'string',
              },
              description: {
                type: 'string',
              },
              price: {
                type: 'number',
              },
              count: {
                type: 'number',
              },
            },
          },
        },
        {
          name: 'ProductsResponse',
          contentType: 'application/json',
          schema: {
            type: 'array',
            items: {
              $ref: '{{{{model: ProductResponse}}}}',
            },
          },
        },
        {
          name: '404JsonResponse',
          contentType: 'application/json',
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
              },
            },
          },
        },
      ],
    },
  },
  plugins: ['serverless-webpack', 'serverless-aws-documentation'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-central-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      DB_USER_AWS: process.env.DB_USER_AWS,
      DB_HOST_AWS: process.env.DB_HOST_AWS,
      DB_NAME_AWS: process.env.DB_NAME_AWS,
      DB_PASSWORD_AWS: process.env.DB_PASSWORD_AWS,
      DB_PORT_AWS: process.env.DB_PORT_AWS,
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { getProductsList, getProductById, createProduct },
};

module.exports = serverlessConfiguration;
