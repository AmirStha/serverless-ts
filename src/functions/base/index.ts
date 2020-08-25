import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
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

import { getSuccessResponse, getErrorResponse } from '@helpers/response';
import {
  SimulateInfinitFunctionLoop,
  SimulateTimeout,
  correlationIdsCheck,
} from '@testCases/observability';
// import { simpleGatewayResponse } from '@testCases/simpleGatewayResponse';

import { echo } from '@queries/echo';
import { testCaseSchema } from './schema';
import { CustomEvent } from './types';

// TODOs proper type checking here look into simpleResponse
const handler: any = async (
  event: CustomEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  Log.info('Boilerplate setup for production lambda');
  let body: object = {};
  if (process.env.ENV === 'prod' || typeof event.body != 'string') {
    body = event.body;
  } else {
    try {
      body = JSON.parse(event.body);
    } catch (err) {
      return getErrorResponse(err);
    }
  }

  // TODOs proper type checking here
  if ((typeof body['testCase'] as any) === 'Undefined') {
    return getErrorResponse(new Error('Please specify the test case senario'));
  }

  switch (body['testCase']) {
    case 'simulateInfinitFunctionLoop':
      if (process.env.ENV == 'prod') {
        let mockEvent = {};
        mockEvent['body'] = body;
        await SimulateInfinitFunctionLoop(mockEvent as CustomEvent);
        return getSuccessResponse({
          statusCode: 200,
          message: echo(
            'simulating InfinitFunctionLoop, please visit the cloudwatch logs of this lambda functions'
          ),
        });
      } else {
        return getErrorResponse(
          new Error(
            'Please donot simulate this testCase in any other mode than prod'
          )
        );
      }
    // case 'simulateTimeout':
    //   // await SimulateTimeout(event, context.getRemainingTimeInMillis() + 2000);

    default:
      return getErrorResponse(
        new Error(`No testCase ${body['testCase']} available`)
      );
  }
};

// TODOs proper type checking here
const wrappedHandler: any = middy(handler)
  .use(jsonBodyParser())
  .use(validator({ inputSchema: testCaseSchema }))
  .use(httpErrorHandler())
  .use(correlationIds({ sampleDebugLogRate: 1 }))
  .use(stopInfiniteLoop(3))
  .use(logTimeout(50));

const prod: boolean =
  process.env.STAGE === 'prod' || process.env.ENV === 'prod';

// TODOs proper type checking here
export const main: any = prod ? wrappedHandler : handler;
