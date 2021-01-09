import { expect } from "chai";
import { Relationship } from "../src/relationship";
import { FamilyTreeBuilder } from "../src/familyTreeBuilder";

const treeFilePath: string = "./res/tree.txt";

describe("familyTree relationship", function () {
    let tree = new FamilyTreeBuilder(treeFilePath).build();
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

describe("familyTree relationship with invalid value", function () {
    let tree = new FamilyTreeBuilder(treeFilePath).build();
    let relationship = new Relationship();
    let result: string;

    it("find relationship with empty member name", function () {
        result = relationship.find(tree, "", "Paternal-Aunt");
        expect(result).to.equal(undefined);
    });

    it("get child from member having no child", function () {
        result = relationship.find(tree, "Charlie", "Daughter");
        expect(result).to.equal("NONE");
    });

    it("find undefined relationship", function () {
        result = relationship.find(tree, "Helen", "Grandma");
        expect(result).to.equal("NONE");
    });
});
