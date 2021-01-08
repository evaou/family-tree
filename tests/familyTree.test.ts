import { expect } from "chai";
import { FamilyTreeBuilder } from "../src/familyTreeBuilder";

describe("familyTree add", function () {
    let tree = new FamilyTreeBuilder().build();

    it("add king queen", function () {
        const result = tree.addKingQueen("Arthur", "Margret");
        expect(result).to.equal("KING_QUEEN_ADDED");
    });

    it("add child", function () {
        const result = tree.addChild("Margret", "Bill", "Male");
        expect(result).to.equal("CHILD_ADDITION_SUCCEEDED");
    });

    it("add spouse", function () {
        const result = tree.addSpouse("Bill", "Flora", "Female");
        expect(result).to.equal("SPOUSE_ADDED");
    });
});
