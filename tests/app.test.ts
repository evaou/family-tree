import { expect } from "chai";
import * as sinon from "sinon";
import app from "../src/app";

describe("shippit example", function () {
    let filePath: string = "./tests/input/shippit-example.txt";
    let exampleOutput: string[] = [
        "CHILD_ADDED",
        "Dominique Minerva",
        "Victoire Dominique Louis",
    ];

    it("readFile", function () {
        let result = app.readFile(filePath);
        expect(result).equal(true);
    });

    it("runCommands", function () {
        let output: string;
        let sinonLog = sinon.spy(console, "log");

        app.runCommands();

        let callArray = sinonLog.getCalls();

        for (let i = 0; i < callArray.length; i++) {
            output = exampleOutput[i];
            expect(callArray[i].firstArg).equal(output);
        }

        sinonLog.restore();
    });
});

describe("shippit sample 1", function () {
    let filePath: string = "./tests/input/shippit-sample-1.txt";
    let exampleOutput: string[] = ["PERSON_NOT_FOUND", "PERSON_NOT_FOUND"];

    it("readFile", function () {
        let result = app.readFile(filePath);
        expect(result).equal(true);
    });

    it("runCommands", function () {
        let output: string;
        let sinonLog = sinon.spy(console, "log");

        app.runCommands();

        let callArray = sinonLog.getCalls();

        for (let i = 0; i < callArray.length; i++) {
            output = exampleOutput[i];
            expect(callArray[i].firstArg).equal(output);
        }

        sinonLog.restore();
    });
});
