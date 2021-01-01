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

        this.king = king;
        this.queen = queen;

        this.king.spouse = this.queen;
        this.queen.spouse = this.king;

        console.log("KING_QUEEN_ADDED");
    }
    /*
    addChild(montherName: string, childName: string, gender: string): string {
        return "CHILD_ADDED";
    }

    addSpouse(name: string, spouseName: string, gender: Gender): string {
        return "SPOUSE_ADDED";
    }

    getRelationship(name: string, relationship: number): string {
        return "Dominique Minerva";
    }

    private findFamilyMember(name: string): FamilyMember | null {}
    private buildFamilyTree(filePath: string): boolean {}
    */
}
