import { expect } from "chai";
import * as sinon from "sinon";
import { App } from "../src/app";

const treeFilePath: string = "./res/tree.txt";

describe("example", function () {
    let app = new App(treeFilePath);
    let filePath: string = "./tests/input/example.txt";
    let commands = app.commandUtil.readFile(filePath);
    let exampleOutput: string[] = [
        "CHILD_ADDITION_SUCCEEDED",
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

describe("sample 1", function () {
    let app = new App(treeFilePath);
    let filePath: string = "./tests/input/sample-1.txt";
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

describe("sample 2", function () {
    let app = new App(treeFilePath);
    let filePath: string = "./tests/input/sample-2.txt";
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

describe("sample 3", function () {
    let app = new App(treeFilePath);
    let filePath: string = "./tests/input/sample-3.txt";
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
