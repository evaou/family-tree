import { expect } from "chai";
import app from "../src/app";

describe("calculate", function () {
    it("add", function () {
        let result = app.sum(5, 2);
        expect(result).equal(7);
    });

    it("substract", function () {
        let result = app.difference(5, 2);
        expect(result).equal(3);
    });
});
