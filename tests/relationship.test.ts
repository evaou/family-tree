import { expect } from "chai";
import { FamilyTree } from "../src/familyTree";
import { Relationship } from "../src/relationship";
import { FamilyTreeBuilder } from "../src/familyTreeBuilder";

describe("familyTree relationship", function () {
    let tree = new FamilyTreeBuilder().build();
    let relationship = new Relationship();
    let result: string;

    it("paternal uncle", function () {
        result = relationship.find(tree, "Molly", "Paternal-Uncle");
        expect(result).to.equal("Bill Charlie Ronald");
    });

    it("maternal uncle", function () {
        result = relationship.find(tree, "Lily", "Maternal-Uncle");
        expect(result).to.equal("Bill Charlie Percy Ronald");
    });

    it("paternal aunt", function () {
        result = relationship.find(tree, "Ron", "Paternal-Aunt");
        expect(result).to.equal("Lily");
    });

    it("maternal aunt", function () {
        result = relationship.find(tree, "Remus", "Maternal-Aunt");
        expect(result).to.equal("Dominique");
    });

    it("sister in law", function () {
        result = relationship.find(tree, "Ronald", "Sister-In-Law");
        expect(result).to.equal("Flora Audrey");
    });

    it("borther in law", function () {
        result = relationship.find(tree, "Helen", "Brother-In-Law");
        expect(result).to.equal("Bill Charlie Percy");
    });

    it("son", function () {
        result = relationship.find(tree, "Harry", "Son");
        expect(result).to.equal("James Albus");
    });

    it("daughter", function () {
        result = relationship.find(tree, "Rose", "Daughter");
        expect(result).to.equal("Aster");
    });

    it("siblings", function () {
        result = relationship.find(tree, "William", "Siblings");
        expect(result).to.equal("NONE");
    });
});
