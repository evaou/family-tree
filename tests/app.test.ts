import { expect } from "chai";
import * as sinon from "sinon";
import { App } from "../src/app";

describe("shippit example", function () {
    let app = new App();
    let filePath: string = "./tests/input/shippit-example.txt";
    let commands = app.commandUtil.readFile(filePath);
    let exampleOutput: string[] = [
        "CHILD_ADDED",
        "Dominique Minerva",
        "Victoire Dominique Louis",
    ];

    it("runCommands", function () {
        let output: string;
        let sinonLog = sinon.spy(console, "log");

        app.runCommands(commands);

        let callArray = sinonLog.getCalls();

        for (let i = 0; i < exampleOutput.length; i++) {
            output = exampleOutput[i];
            expect(callArray[i].firstArg).equal(output);
        }

        sinonLog.restore();
    });
});

describe("shippit sample 1", function () {
    let app = new App();
    let filePath: string = "./tests/input/shippit-sample-1.txt";
    let commands = app.commandUtil.readFile(filePath);
    let exampleOutput: string[] = ["PERSON_NOT_FOUND", "PERSON_NOT_FOUND"];

    it("runCommands", function () {
        let output: string;
        let sinonLog = sinon.spy(console, "log");

        app.runCommands(commands);

        let callArray = sinonLog.getCalls();

        for (let i = 0; i < exampleOutput.length; i++) {
            output = exampleOutput[i];
            expect(callArray[i].firstArg).equal(output);
        }

        sinonLog.restore();
    });
});

describe("shippit sample 2", function () {
    let app = new App();
    let filePath: string = "./tests/input/shippit-sample-2.txt";
    let commands = app.commandUtil.readFile(filePath);
    let exampleOutput: string[] = ["CHILD_ADDITION_FAILED", "NONE"];

    it("runCommands", function () {
        let output: string;
        let sinonLog = sinon.spy(console, "log");

        app.runCommands(commands);

        let callArray = sinonLog.getCalls();

        for (let i = 0; i < exampleOutput.length; i++) {
            output = exampleOutput[i];
            expect(callArray[i].firstArg).equal(output);
        }

        sinonLog.restore();
    });
});

describe("shippit sample 3", function () {
    let app = new App();
    let filePath: string = "./tests/input/shippit-sample-3.txt";
    let commands = app.commandUtil.readFile(filePath);
    let exampleOutput: string[] = ["Darcy Alice"];

    it("runCommands", function () {
        let output: string;
        let sinonLog = sinon.spy(console, "log");

        app.runCommands(commands);

        let callArray = sinonLog.getCalls();

        for (let i = 0; i < exampleOutput.length; i++) {
            output = exampleOutput[i];
            expect(callArray[i].firstArg).equal(output);
        }

        sinonLog.restore();
    });
});
