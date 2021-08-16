/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: [
    "js",
    "ts"
  ],
  "moduleNameMapper": {
    "@libs/apiGateway": "<rootDir>/src/libs/apiGateway",
    "@libs/lambda": "<rootDir>/src/libs/lambda",
  }
};
