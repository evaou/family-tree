import { FamilyMember, Father, Mother, Child } from "./familyMember";
import { Gender } from "./familyAttribute";

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

        let mother = this.findFamilyMember(motherName);

        if (!mother) {
            throw new Error("addChild(): Mother was not found.");
        } else {
            mother.addChild(childName, gender);
        }

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

    private findFamilyMember(name: string): FamilyMember | null {
        if (name.length <= 0) {
            return null;
        }

        if (this.king === null || this.queen === null) {
            return null;
        }

        let queue: FamilyMember[] = [this.king, this.queen];
        let currentMember: FamilyMember;

        while (queue.length > 0) {
            currentMember = queue.shift();

            if (name === currentMember.name) {
                return currentMember;
            }

            if (
                currentMember.gender === Gender.Female &&
                currentMember.child.length > 0
            ) {
                for (let i = 0; i < currentMember.child.length; i++) {
                    let child = currentMember.child[i];
                    queue.push(child);
                    if (child.spouse) {
                        queue.push(child.spouse);
                    }
                }
            }
        }

        console.log("Eva: final null");

        return null;
    }

    /*
    private buildFamilyTree(filePath: string): boolean {}
    */
}
