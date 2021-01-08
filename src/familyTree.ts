import { FamilyMember, Father, Mother} from "./familyMember";
import { FamilyTreeBuilder } from "./familyTreeBuilder";

export class FamilyTree {
    king: Father | null;
    queen: Mother | null;
    private hashMembers: { [key: string]: FamilyMember } = {};

    constructor(familyTreeBuilder: FamilyTreeBuilder) {
        this.king = familyTreeBuilder.king;
        this.queen = familyTreeBuilder.queen;
    }

    addKingQueen(kingName: string, queenName: string): string {
        if (kingName.length <= 0 || queenName.length <= 0) {
            return;
        }

        let king = new Father(kingName);
        this.hashMembers[king.name] = king;

        let queen = new Mother(queenName);
        this.hashMembers[queen.name] = queen;

        king.addSpouse(queen);

        this.king = king;
        this.queen = queen;

        return "KING_QUEEN_ADDED";
    }

    addChild(motherName: string, childName: string, gender: string): string {
        if (
            motherName.length <= 0 ||
            childName.length <= 0 ||
            gender.length <= 0
        ) {
            return;
        }

        let mother = this.findFamilyMember(motherName);

        if (!mother) {
            return "PERSON_NOT_FOUND";
        }

        let child = mother.addChild(childName, gender);

        if (child) {
            this.hashMembers[child.name] = child;
            return "CHILD_ADDED";
        } else {
            return "CHILD_ADDITION_FAILED";
        }
    }

    addSpouse(name: string, spouseName: string, gender: string): string {
        if (name.length <= 0 || spouseName.length <= 0) {
            return;
        }

        let spouse = new FamilyMember(spouseName, gender);
        this.hashMembers[spouse.name] = spouse;

        let member = this.findFamilyMember(name);

        if (!member) {
            return "PERSON_NOT_FOUND";
        }

        member.addSpouse(spouse);

        return "SPOUSE_ADDED";
    }

    findFamilyMember(name: string): FamilyMember | null {
        if (name.length <= 0) {
            return null;
        }

        if (name in this.hashMembers) {
            return this.hashMembers[name];
        } else {
            return null;
        }
    }
}
