import { FamilyMember, Father, Mother, Child } from "./familyMember";

//const filePath: string = "./res/tree.txt";

export class FamilyTree {
    king: Father | null;
    queen: Mother | null;

    constructor() {
        this.king = null;
        this.queen = null;
        //this.buildFamilyTree(filePath);
    }

    addKingQueen(kingName: string, queenName: string): void {
        if (kingName.length <= 0 || queenName.length <= 0) {
            return;
        }

        let king = new Father(kingName);
        let queen = new Mother(queenName);

        king.addSpouse(queen);
        queen.addSpouse(king);

        this.king = king;
        this.queen = queen;

        console.log("KING_QUEEN_ADDED");
    }

    addChild(motherName: string, childName: string, gender: string): void {
        if (
            motherName.length <= 0 ||
            childName.length <= 0 ||
            gender.length <= 0
        ) {
            return;
        }

        // findFamilyMember(motherName);

        console.log("CHILD_ADDED");
    }

    addSpouse(name: string, spouseName: string, gender: string): void {
        if (name.length <= 0 || spouseName.length <= 0) {
            return;
        }

        console.log("SPOUSE_ADDED");
    }

    getRelationship(name: string, relationship: number): void {
        if (name.length <= 0) {
            return;
        }

        console.log("Dominique Minerva");
    }

    /*
    private findFamilyMember(name: string): FamilyMember | null {}
    private buildFamilyTree(filePath: string): boolean {}
    */
}
