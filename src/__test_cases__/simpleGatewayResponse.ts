import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';

import { getSuccessResponse } from '@helpers/response';
import { echo } from '@queries/echo';

export const simpleGatewayResponse: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  return getSuccessResponse({
    statusCode: 200,
    message: echo('This is a success message'),
    input: event,
  });
};
