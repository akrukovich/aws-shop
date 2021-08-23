module.exports = {
  extends: ['airbnb-base','airbnb-typescript/base'],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    "import/no-extraneous-dependencies": ["off"],
    "import/extensions": ["off"]
  }
}
