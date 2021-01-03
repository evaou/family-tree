import { FamilyMember, Father, Mother, Child } from "./familyMember";
import { Gender } from "./familyAttribute";
import * as fs from "fs";

const filePath: string = "./res/tree.txt";

export class FamilyTree {
    king: Father | null;
    queen: Mother | null;

    constructor() {
        this.king = null;
        this.queen = null;
        this.buildFamilyTree(filePath);
    }

    addKingQueen(kingName: string, queenName: string): void {
        if (kingName.length <= 0 || queenName.length <= 0) {
            return;
        }

        let king = new Father(kingName);
        let queen = new Mother(queenName);

        king.addSpouse(queen);

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

        let spouse = new FamilyMember(spouseName, gender);
        let member = this.findFamilyMember(name);

        if (!member) {
            throw new Error("addSpouse(): Member was not found.");
        } else {
            member.addSpouse(spouse);
        }

        console.log("SPOUSE_ADDED");
    }

    getRelationship(name: string, relationship: string): void {
        if (name.length <= 0) {
            return;
        }

        let member = this.findFamilyMember(name);
        let result: string[] = [];

        switch (relationship) {
            case "Paternal-Uncle":
                result = this.getSiblings(member.father, Gender.Male);
                break;
            case "Maternal-Uncle":
                result = this.getSiblings(member.mother, Gender.Male);
                break;
            case "Paternal-Aunt":
                result = this.getSiblings(member.father, Gender.Female);
                break;
            case "Maternal-Aunt":
                result = this.getSiblings(member.mother, Gender.Female);
                break;
            default:
                break;
        }

        console.log(result.join(" "));
    }

    private getSiblings(
        member: FamilyMember,
        siblingsGender: Gender
    ): string[] {
        let mother = member.mother;
        let siblings: string[] = [];
        let child: Child;

        for (let i = 0; i < mother.child.length; i++) {
            child = mother.child[i];

            if (child.gender === siblingsGender && child.name !== member.name) {
                siblings.push(child.name);
            }
        }

        return siblings;
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

        return null;
    }

    private buildFamilyTree(filePath: string): void {
        let data: Buffer = fs.readFileSync(filePath);
        let commands = data.toString().split("\n");
        let command: string;
        let action: string;
        let parameters: any[];

        for (let i = 0; i < commands.length; i++) {
            command = commands[i];
            if (command.length === 0) {
                continue;
            }

            action = command.split(" ")[0];
            parameters = command.split(" ").slice(1);

            switch (action) {
                case "ADD_KING_QUEEN":
                    this.addKingQueen(parameters[0], parameters[1]);
                    break;
                case "ADD_CHILD":
                    this.addChild(parameters[0], parameters[1], parameters[2]);
                    break;
                case "ADD_SPOUSE":
                    this.addSpouse(parameters[0], parameters[1], parameters[2]);
                    break;
                default:
                    break;
            }
        }
    }
}
