export const testSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        test: { type: 'string', minLength: 12, maxLength: 19 },
      },
      required: ['test'],
    },
  },
};
