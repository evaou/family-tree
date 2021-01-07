import { expect } from "chai";
import { FamilyTree } from "../src/familyTree";

describe("familyTree add", function () {
    let tree = new FamilyTree();

    it("add king queen", function () {
        const result = tree.addKingQueen("Arthur", "Margret");
        expect(result).to.equal("KING_QUEEN_ADDED");
    });

    it("add child", function () {
        const result = tree.addChild("Margret", "Bill", "Male");
        expect(result).to.equal("CHILD_ADDED");
    });

    it("add spouse", function () {
        const result = tree.addSpouse("Bill", "Flora", "Female");
        expect(result).to.equal("SPOUSE_ADDED");
    });
});
