# Family Tree 

## Run Program
npm run start \<test-file-path\>

    $ npm run start ./tests/input/shippit-example.txt
    $ npm run start ./tests/input/shippit-sample-1.txt
    $ npm run start ./tests/input/shippit-sample-2.txt
    $ npm run start ./tests/input/shippit-sample-3.txt

## Run Test

    $ npm run test
    $ npm run test -- -grep "shippit"
    $ npm run test -- -grep "familyTree"
    $ npm run coverage

- test coverage report is at *./coverage/lcov-report/tests/index.html*
## Plan
1. Domain-Driven Design (DDD)
    - Use case diagram
    - Domain model
    - Class diagram
2. Test-Driven Development (TDD)
3. Dockerization

## Setup
### Init Node Project
1. Prepare configuration and source files
    - package.json
    - tsconfig.json
    - src/app.ts

    ```
    $ npm install typescript
    $ npm init
    $ tsc --init
    ```
2. Verify project

    ```
    $ npm run start
    ```

### Test
1. Prepare test environment

    ```
    $ npm install --save-dev chai mocha sinon nyc ts-node
    $ npm install @types/chai @types/mocha @types/sinon
    ```
2. Add test script in *package.json*

    ```
    "scripts": {
        "test": "mocha --require ts-node/register tests/**/*.test.ts",
        "coverage": "nyc -r lcov -e .ts -x \"*.test.ts\" npm run test"
    }
    ```
3. Add test file