import * as sinon from "sinon";
import { FamilyTree } from "../src/familyTree";

describe("familyTree add", function () {
    let tree = new FamilyTree();
    let sinonLog;

    beforeEach(() => {
        sinonLog = sinon.spy(console, "log");
    });

    afterEach(() => {
        sinonLog.restore();
    });

    it("add king queen", function () {
        tree.addKingQueen("Arthur", "Margret");

        if (!sinonLog.calledOnceWith("KING_QUEEN_ADDED")) {
            throw new Error("Log was not called");
        }
    });

    it("add child", function () {
        tree.addChild("Margret", "Bill", "Male");

        if (!sinonLog.calledOnceWith("CHILD_ADDED")) {
            throw new Error("Log was not called");
        }
    });

    it("add spouse", function () {
        tree.addSpouse("Bill", "Flora", "Female");

        if (!sinonLog.calledOnceWith("SPOUSE_ADDED")) {
            throw new Error("Log was not called");
        }
    });
});

describe("familyTree relationship", function () {
    let tree = new FamilyTree();
    let sinonLog;

    beforeEach(() => {
        sinonLog = sinon.spy(console, "log");
    });

    afterEach(() => {
        sinonLog.restore();
    });

    it("paternal uncle", function () {
        tree.getRelationship("Molly", "Paternal-Uncle");

        if (!sinonLog.calledOnceWith("Bill Charlie Ronald")) {
            throw new Error("Log was not called");
        }
    });

    it("maternal uncle", function () {
        tree.getRelationship("Lily", "Maternal-Uncle");

        if (!sinonLog.calledOnceWith("Bill Charlie Percy Ronald")) {
            throw new Error("Log was not called");
        }
    });

    it("paternal aunt", function () {
        tree.getRelationship("Ron", "Paternal-Aunt");

        if (!sinonLog.calledOnceWith("Lily")) {
            throw new Error("Log was not called");
        }
    });

    it("maternal aunt", function () {
        tree.getRelationship("Remus", "Maternal-Aunt");

        if (!sinonLog.calledOnceWith("Dominique")) {
            throw new Error("Log was not called");
        }
    });

    it("sister in law", function () {
        tree.getRelationship("Ronald", "Sister-In-Law");

        if (!sinonLog.calledOnceWith("Flora Audrey")) {
            throw new Error("Log was not called");
        }
    });

    it("borther in law", function () {
        tree.getRelationship("Helen", "Brother-In-Law");

        if (!sinonLog.calledOnceWith("Bill Charlie Percy")) {
            throw new Error("Log was not called");
        }
    });
});
