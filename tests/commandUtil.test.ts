import { expect } from "chai";
import { CommandUtil } from "../src/commandUtil";

describe("valid command", function () {
    let commandUtil = new CommandUtil();

    it("get relationship", function () {
        const result = commandUtil.isValidCommand(
            "GET_RELATIONSHIP Minerva Siblings"
        );
        expect(result).equal(true);
    });

    it("add child", function () {
        const result = commandUtil.isValidCommand("ADD_CHILD Luna Lola Female");
        expect(result).equal(true);
    });
});

describe("invalid command", function () {
    let commandUtil = new CommandUtil();

    it("invalid action", function () {
        const result = commandUtil.isValidCommand(
            "ADD_CHILD2 Luna Lola Female"
        );
        expect(result).equal(false);
    });

    it("invalid parameter number", function () {
        const result = commandUtil.isValidCommand("ADD_CHILD Lola Female");
        expect(result).equal(false);
    });
});

describe("read command file", function () {
    it("file exists", function () {
        let commandUtil = new CommandUtil();
        let filePath: string = "./tests/input/shippit-example.txt";

        const result = commandUtil.readFile(filePath);
        expect(result.length).greaterThan(0);
    });

    it("file doesn't exist", function () {
        let commandUtil = new CommandUtil();
        let filePath: string = "./tests/input/shippit-sample-5.txt";

        const result = commandUtil.readFile(filePath);
        expect(result.length).equal(0);
    });
});
