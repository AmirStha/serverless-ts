import { HandlerResponseFunc, Response } from './types';

export const getErrorResponse: HandlerResponseFunc = (error: Response) => {
  console.log(error);
  return {
    statusCode: error.statusCode || 500,
    headers: {
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({ message: error.message, success: false }),
  };
};

export const getSuccessResponse: HandlerResponseFunc = (response: Response) => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      message: 'Executed Successfully',
      data: response,
      success: true,
    }),
  };
};
