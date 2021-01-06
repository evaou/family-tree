import { expect } from "chai";
import { CommandValidator } from "../src/commandValidator";

describe("valid command", function () {
    let validator = new CommandValidator();

    it("get relationship", function () {
        const result = validator.isValidCommand("GET_RELATIONSHIP Minerva Siblings");
        expect(result).equal(true);
    });

    it("add child", function () {
        const result = validator.isValidCommand("ADD_CHILD Luna Lola Female");
        expect(result).equal(true);
    });
});

describe("invalid command", function () {
    let validator = new CommandValidator();

    it("invalid action", function () {
        const result = validator.isValidCommand("ADD_CHILD2 Luna Lola Female");
        expect(result).equal(false);
    });

    it("invalid parameter number", function () {
        const result = validator.isValidCommand("ADD_CHILD Lola Female");
        expect(result).equal(false);
    });
});
