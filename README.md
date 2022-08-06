## Introduction

This is boilerplate hapi typescript project

## Environment variables to be passed in pipeline

Copy the file '.env.sample' and rename it to '.env', then update the necessary environment variables:

```
MONGO_URI
```

## Version specification

- Node: v16

## IDE specification

- VSCode IDE
- Eslint vscode plugin
- Prettier vscode plugin

## Dev setup

- Install all the dependencies using `yarn`
- To run the server with watch use `yarn watch`
- To run the test cases in watch mode use `yarn test-watch`
- To run the test cases without watch mode use `yarn test`
- To run docker compose `docker-compose -f docker-compose.dev.yml up -d`

## Test

- Unit Test: We are using Jest for assertion and mocking

## Git Hooks

The seed uses `husky` to enable commit hook.

### Pre commit
Whenever there is a commit, there will be check on lint, on failure commit fails.

### Pre push
Whenever there is a push, there will be check on test.

## Misc

Swagger API is at http://localhost:8000/{version}documentation

Example
```
http://localhost:8000/v1/documentation
```
# Database schema design:
TODO: TBU
<hr>

# Deployment:
TODO: TBU
<hr>

# Coding Convention
Style Guide Referrence
https://basarat.gitbook.io/typescript/styleguide

TODO: update source tree here
<hr>
