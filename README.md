# Family Tree

The app will by default load the Arthur family tree during initialization. All below commands are executable under project root folder.
## Docker Execution (Recommended)

- Prepare docker container

    ```
    // build docker image
    $ docker build -t evaou/family-tree-app .

    // get docker image id
    $ docker images | grep family-tree-app | awk '{print $3}'

    // run docker container
    $ docker run -itd <docker-image-id>

    // get docker container id
    $ docker ps | grep <docker-image-id> | awk '{print $1}'
    ```

- Run program

    ```
    $ docker exec -it <docker-container-id> node dist/src/app ./tests/input/shippit-example.txt
    $ docker exec -it <docker-container-id> node dist/src/app ./tests/input/shippit-sample-1.txt
    $ docker exec -it <docker-container-id> node dist/src/app ./tests/input/shippit-sample-2.txt
    $ docker exec -it <docker-container-id> node dist/src/app ./tests/input/shippit-sample-3.txt
    ```

- Run test

    ```
    $ docker exec -it <docker-container-id> npm run test
    $ docker exec -it <docker-container-id> npm run test -- -grep "shippit"
    $ docker exec -it <docker-container-id> npm run test -- -grep "familyTree"
    $ docker exec -it <docker-container-id> npm run test coverage
    ```

- Run program with host input file

    ```
    // get docker image id
    $ docker images | grep family-tree-app | awk '{print $3}'

    // run docker container mounted with host input directory
    $ docker run -v <host-input-directory-absolute-path>:/app/shippit-input -itd <docker-image-id>

    // get new docker container id
    $ docker ps | grep <docker-image-id> | awk '{print $1}' | awk 'NR==1{print $1}'

    // Below file path needs to exist before execution
    // <host-input-directory-absolute-path>/<host-input-filename>
    $ docker exec -it <new-docker-container-id> node dist/src/app ./shippit-input/<host-input-filename>
    ```
## Local Execution

- Run program

    ```
    $ npm run start ./tests/input/shippit-example.txt
    $ npm run start ./tests/input/shippit-sample-1.txt
    $ npm run start ./tests/input/shippit-sample-2.txt
    $ npm run start ./tests/input/shippit-sample-3.txt
    ```

- Run test

    ```
    $ npm run test
    $ npm run test -- -grep "shippit"
    $ npm run test -- -grep "familyTree"
    $ npm run coverage
    ```

- Run program with host input file

    ```
    $ npm run start <host-input-file-absolute-path>
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