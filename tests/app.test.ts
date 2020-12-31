import { expect } from "chai";
import * as sinon from "sinon";
import app from "../src/app";

describe("example", function () {
    let filePath: string = "./tests/input/example.txt";
    let exampleOutput: string[] = [
        "CHILD_ADDED",
        "Dominique Minerva",
        "Victoire Dominique Louis",
    ];
    /*
    let exampleOutput: string[] = [
        "ADD_CHILD",
        "GET_RELATIONSHIP",
        "GET_RELATIONSHIP",
    ];
    */

    it("readFile", function () {
        let result = app.readFile(filePath);
        expect(result).equal(true);
    });

    it("runCommands", function () {
        const sinonLog = sinon.spy(console, "log");
        let callArray;
        let output: string;

        app.runCommands();

        callArray = sinonLog.getCalls();

        for (let i = 0; i < exampleOutput.length; i++) {
            output = exampleOutput[i];
            expect(callArray[i].firstArg).equal(output);
        }
    });
});
