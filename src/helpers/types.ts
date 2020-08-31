import { APIGatewayProxyResult } from 'aws-lambda';

export enum HttpStatusCode {
  NOT_FOUND = 404,
  ERROR = 500,
  SUCCESS = 200,
}

export interface HandlerResponseFunc {
  // TODO: implement proper type checking
  (response: any): APIGatewayProxyResult;
}

export interface Response {
  statusCode: number;
  message: string;
}
