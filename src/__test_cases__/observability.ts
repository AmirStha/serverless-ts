import { APIGatewayProxyEvent } from 'aws-lambda';

import { TestCase, TestCaseSimulateTimeout, CustomEvent } from './types';

// TODO: learning about the Lambda client from dazn powertools

import Lambda from '@dazn/lambda-powertools-lambda-client';
import correlationIds from '@dazn/lambda-powertools-middleware-correlation-ids';

export const SimulateInfinitFunctionLoop: TestCase = async (
  event: CustomEvent
) => {
  event.body.testCase = 'simulateInfinitFunctionLoop';
  await Lambda.invoke({
    FunctionName: process.env.AWS_LAMBDA_FUNCTION_NAME,
    InvocationType: 'Event',
    Payload: JSON.stringify(event),
  }).promise();
};

export const correlationIdsCheck: TestCase = async (event: CustomEvent) => {
  console.log('Testing the correlation id: ', correlationIds, event);
};

export const SimulateTimeout: TestCaseSimulateTimeout = async (
  event: CustomEvent,
  timeout: number
) => {
  console.log('>>>>>>> test');
  setTimeout((timeout) => {
    console.log('Timed out after: ', timeout);
  }, timeout);
};
