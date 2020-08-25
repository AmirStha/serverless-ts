export const testCaseSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        testCase: { type: 'string', minLength: 12, maxLength: 29 },
      },
      required: ['testCase'],
    },
  },
};
