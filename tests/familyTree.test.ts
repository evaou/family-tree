import { expect } from "chai";
import { FamilyTreeBuilder } from "../src/familyTreeBuilder";

const treeFilePath: string = "./res/tree.txt";

describe("familyTree add", function () {
    let tree = new FamilyTreeBuilder(treeFilePath).build();

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

describe("familyTree add with invalid value", function () {
    let tree = new FamilyTreeBuilder(treeFilePath).build();

    it("add king queen with empty king name", function () {
        const result = tree.addKingQueen("", "Margret");
        expect(result).to.equal(undefined);
    });

    it("add child with empty child name", function () {
        const result = tree.addChild("Margret", "", "Male");
        expect(result).to.equal(undefined);
    });

    it("add spouse with empty spouse name", function () {
        const result = tree.addSpouse("Bill", "", "Female");
        expect(result).to.equal(undefined);
    });

    it("add spouse with nonexistent member name", function () {
        const result = tree.addSpouse("BillFake", "Flora", "Female");
        expect(result).to.equal("PERSON_NOT_FOUND");
    });

    it("find member with empty name", function () {
        const result = tree.findFamilyMember("");
        expect(result).to.equal(null);
    });
});
