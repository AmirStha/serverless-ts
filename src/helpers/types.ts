import { APIGatewayProxyResult } from 'aws-lambda';

export enum HttpStatusCode {
  NOT_FOUND = 404,
  ERROR = 500,
  SUCCESS = 200,
}

export interface HandlerResponseFunc {
  (response: object): APIGatewayProxyResult;
}

export interface Response {
  statusCode: number;
  message: string;
}
