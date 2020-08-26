import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';

import 'source-map-support/register';

import middy from 'middy';
import validator from '@middy/validator';
import httpErrorHandler from '@middy/http-error-handler';
import jsonBodyParser from '@middy/http-json-body-parser';

import Log from '@dazn/lambda-powertools-logger';
import logTimeout from '@dazn/lambda-powertools-middleware-log-timeout';
import correlationIds from '@dazn/lambda-powertools-middleware-correlation-ids';
import stopInfiniteLoop from '@dazn/lambda-powertools-middleware-stop-infinite-loop';

import { getSuccessResponse } from '@helpers/response';

import { echo } from '@queries/echo';
import { testSchema } from './schema';

const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  Log.info('Boilerplate setup for production lambda');
  return getSuccessResponse({
    statusCode: 200,
    message: echo('This is a success message'),
    input: event,
  });
};

const wrappedHandler: APIGatewayProxyHandler = middy(handler)
  .use(jsonBodyParser())
  .use(validator({ inputSchema: testSchema }))
  .use(httpErrorHandler())
  .use(correlationIds({ sampleDebugLogRate: 1 }))
  .use(stopInfiniteLoop(3))
  .use(logTimeout(50));

const prod = process.env.STAGE === 'prod' || process.env.ENV === 'prod';
export const main: APIGatewayProxyHandler = prod ? wrappedHandler : handler;
