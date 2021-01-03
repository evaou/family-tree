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

describe("familyTree relationship", function () {
    let tree = new FamilyTree();
    let result: string;

    it("paternal uncle", function () {
        result = tree.getRelationship("Molly", "Paternal-Uncle");
        expect(result).to.equal("Bill Charlie Ronald");
    });

    it("maternal uncle", function () {
        result = tree.getRelationship("Lily", "Maternal-Uncle");
        expect(result).to.equal("Bill Charlie Percy Ronald");
    });

    it("paternal aunt", function () {
        result = tree.getRelationship("Ron", "Paternal-Aunt");
        expect(result).to.equal("Lily");
    });

    it("maternal aunt", function () {
        result = tree.getRelationship("Remus", "Maternal-Aunt");
        expect(result).to.equal("Dominique");
    });

    it("sister in law", function () {
        result = tree.getRelationship("Ronald", "Sister-In-Law");
        expect(result).to.equal("Flora Audrey");
    });

    it("borther in law", function () {
        result = tree.getRelationship("Helen", "Brother-In-Law");
        expect(result).to.equal("Bill Charlie Percy");
    });

    it("son", function () {
        result = tree.getRelationship("Harry", "Son");
        expect(result).to.equal("James Albus");
    });

    it("daughter", function () {
        result = tree.getRelationship("Rose", "Daughter");
        expect(result).to.equal("Aster");
    });

    it("siblings", function () {
        result = tree.getRelationship("William", "Siblings");
        expect(result).to.equal("NONE");
    });
});
