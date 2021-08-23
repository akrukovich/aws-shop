
export const createProductSchema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    description: { type: 'string', nullable: true },
    price: { type: 'number', nullable: true },
    count: { type: 'number' },
  },
  required: ['title', 'price'],
  additionalProperties: false,
};
