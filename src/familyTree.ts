import { FamilyMember, Father, Mother, Gender } from "./familyMember";
import { CommandUtil } from "./commandUtil";

const filePath: string = "./res/tree.txt";

export class FamilyTree {
    king: Father | null;
    queen: Mother | null;
    commandUtil: CommandUtil = new CommandUtil();

    constructor() {
        this.king = null;
        this.queen = null;
        this.buildFamilyTree(filePath);
    }

    addKingQueen(kingName: string, queenName: string): string {
        if (kingName.length <= 0 || queenName.length <= 0) {
            return;
        }

        let king = new Father(kingName);
        let queen = new Mother(queenName);

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

        if (mother.addChild(childName, gender)) {
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

        return null;
    }

    private buildFamilyTree(filePath: string): void {
        let commands = this.commandUtil.readFile(filePath);

        for (let i = 0; i < commands.length; i++) {
            this.commandUtil.execute(commands[i], this);
        }
    }
}
