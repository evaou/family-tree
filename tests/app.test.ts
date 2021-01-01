import { expect } from "chai";
import * as sinon from "sinon";
import app from "../src/app";
import { FamilyTree } from "../src/familyTree";

describe("basic operation", function () {
    let tree = new FamilyTree();
    const sinonLog = sinon.spy(console, "log");
    let callArray;

    it("add king queen", function () {
        tree.addKingQueen("Arthur", "Margre");
        callArray = sinonLog.getCalls();
        expect(callArray[0].firstArg).equal("KING_QUEEN_ADDED");
    });
});

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
