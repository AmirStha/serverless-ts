## To use this boilerplate

Install the template

```
sls install --url https://github.com/AmirStha/serverless-ts.git --name <your_lambda_projectname>
```

Install required dependencies

```
npm install
```

Deploy the code

```
npm run deploy
```

Please dont use sls deploy, typescript needs to be converted to js

## Installing powertool library

npm install --save middy @dazn/lambda-powertools-middleware-correlation-ids @dazn/lambda-powertools-middleware-stop-infinite-loop @dazn/lambda-powertools-logger @dazn/lambda-powertools-middleware-log-timeout @types/aws-lambda

## Installing parser and validator

npm install --save @middy/http-json-body-parser @middy/http-error-handler @middy/validator
