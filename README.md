# Family Tree

The app will by default load the Arthur family tree during initialization. All below commands are executable under project root folder.

## Docker Execution (Recommended)

- Prepare docker image

    ```
    // build docker image
    $ docker build -t evaou/family-tree-app .

    // get docker image id
    $ docker images | grep family-tree-app | awk '{print $3}'
    ```

- Prepare docker container

    ```
    // run docker container and mount with host input directory
    // e.g. docker run -v /Users/evaou/test:/app/shippit-input -itd db0efd8cdccc
    $ docker run -v <host-input-directory-absolute-path>:/app/shippit-input -itd <docker-image-id>

    // get docker container id
    // e.g. docker ps | grep db0efd8cdccc | awk '{print $1}'
    $ docker ps | grep <docker-image-id> | awk '{print $1}'
    ```

- Run program

    ```
    $ docker exec -it <docker-container-id> node dist/src/app ./tests/input/shippit-example.txt
    $ docker exec -it <docker-container-id> node dist/src/app ./tests/input/shippit-sample-1.txt
    $ docker exec -it <docker-container-id> node dist/src/app ./tests/input/shippit-sample-2.txt
    $ docker exec -it <docker-container-id> node dist/src/app ./tests/input/shippit-sample-3.txt
    ```

- Run program with host input file

    ```
    // Below file path needs to exist before execution
    // <host-input-directory-absolute-path>/<host-input-filename>
    // e.g. docker exec -it f9dc586a078b node dist/src/app ./shippit-input/shippit-sample-4.txt 
    $ docker exec -it <docker-container-id> node dist/src/app ./shippit-input/<host-input-filename>
    ```

- Run test

    ```
    $ docker exec -it <docker-container-id> npm run test
    $ docker exec -it <docker-container-id> npm run test -- -grep "shippit"
    $ docker exec -it <docker-container-id> npm run test -- -grep "familyTree"
    $ docker exec -it <docker-container-id> npm run test coverage
    ```

## Local Execution

- Prepare build

    ```
    $ npm install
    $ npm run build
    ```

- Run program

    ```
    $ node dist/src/app ./tests/input/shippit-example.txt
    $ node dist/src/app ./tests/input/shippit-sample-1.txt
    $ node dist/src/app ./tests/input/shippit-sample-2.txt
    $ node dist/src/app ./tests/input/shippit-sample-3.txt
    ```

- Run program with host input file

    ```
    // e.g. node dist/src/app /Users/evaou/test/shippit-sample-4.txt
    $ node dist/src/app <host-input-file-absolute-path>
    ```

- Run test

    ```
    $ npm run test
    $ npm run test -- -grep "shippit"
    $ npm run test -- -grep "familyTree"
    $ npm run coverage
    ```

## Plan

1. Domain-Driven Design (DDD)
2. Test-Driven Development (TDD)
3. Dockerization

## Design

- Use case diagram

![](res/use-case-diagram.png)

- Domain model

![](res/domain-model.png)

- Class diagram

![](res/class-diagram.png)

## Test Coverage
Test coverage report is at _./coverage/lcov-report/tests/index.html_

![](res/test-coverage.png)