import { expect } from "chai";
import { CommandUtil } from "../src/commandUtil";

describe("valid command", function () {
    let commandUtil = new CommandUtil();

    it("get relationship", function () {
        const result = commandUtil.isValidCommand("GET_RELATIONSHIP Minerva Siblings");
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
        const result = commandUtil.isValidCommand("ADD_CHILD2 Luna Lola Female");
        expect(result).equal(false);
    });

    it("invalid parameter number", function () {
        const result = commandUtil.isValidCommand("ADD_CHILD Lola Female");
        expect(result).equal(false);
    });
});
