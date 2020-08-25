interface CustomTestCaseBody {
  testCase: string;
}

export interface CustomEvent {
  body: CustomTestCaseBody;
  headers: { [name: string]: string };
  multiValueHeaders: { [name: string]: string[] };
  httpMethod: string;
  isBase64Encoded: boolean;
  path: string;
  pathParameters: { [name: string]: string } | null;
  queryStringParameters: { [name: string]: string } | null;
  multiValueQueryStringParameters: { [name: string]: string[] } | null;
  stageVariables: { [name: string]: string } | null;
  resource: string;
}

export interface TestCase {
  (event: CustomEvent): void;
}

export interface TestCaseSimulateTimeout {
  (event: CustomEvent, timeout: number): void;
}
