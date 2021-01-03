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
            return;
        }

        if (!mother.addChild(childName, gender)) {
            return;
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
            return;
        }

        member.addSpouse(spouse);

        console.log("SPOUSE_ADDED");
    }

    getRelationship(name: string, relationship: string): void {
        if (name.length <= 0) {
            return;
        }

        let member = this.findFamilyMember(name);

        if (!member) {
            return;
        }

        let siblingSpouses: string[] = [];
        let result: string[] = [];

        switch (relationship) {
            case "Paternal-Uncle":
                result = this.getSibling(member.father, Gender.Male);
                break;
            case "Maternal-Uncle":
                result = this.getSibling(member.mother, Gender.Male);
                break;
            case "Paternal-Aunt":
                result = this.getSibling(member.father, Gender.Female);
                break;
            case "Maternal-Aunt":
                result = this.getSibling(member.mother, Gender.Female);
                break;
            case "Sister-In-Law":
                result = this.getSibling(member.spouse, Gender.Female);
                siblingSpouses = this.getSiblingSpouse(member, Gender.Female);
                result = result.concat(siblingSpouses);
                break;
            case "Brother-In-Law":
                result = this.getSibling(member.spouse, Gender.Male);
                siblingSpouses = this.getSiblingSpouse(member, Gender.Male);
                result = result.concat(siblingSpouses);
                break;
            case "Son":
                result = this.getChild(member, Gender.Male);
                break;
            case "Daughter":
                result = this.getChild(member, Gender.Female);
                break;
            case "Siblings":
                result = this.getSibling(member);
                break;
            default:
                break;
        }

        if (result.length > 0) {
            console.log(result.join(" "));
        }
    }

    private getSibling(
        member: FamilyMember,
        siblingGender: Gender = -1
    ): string[] {
        let mother = member.mother;
        let siblings: string[] = [];
        let child: Child;
        let errorMessage: string = "NONE";

        if (!mother) {
            return siblings;
        }

        for (let i = 0; i < mother.child.length; i++) {
            child = mother.child[i];

            if (child.name === member.name) {
                continue;
            }

            if (siblingGender !== -1 && siblingGender !== child.gender) {
                continue;
            }

            siblings.push(child.name);
        }

        if (siblings.length === 0) {
            console.log(errorMessage);
        }

        return siblings;
    }

    private getSiblingSpouse(
        member: FamilyMember,
        spouseGender: Gender
    ): string[] {
        let mother = member.mother;
        let spouses: string[] = [];
        let child: Child;

        if (!mother) {
            return spouses;
        }

        for (let i = 0; i < mother.child.length; i++) {
            child = mother.child[i];

            if (
                child.gender !== spouseGender &&
                child.name !== member.name &&
                child.spouse
            ) {
                spouses.push(child.spouse.name);
            }
        }

        return spouses;
    }

    private getChild(member: FamilyMember, childGender: Gender): string[] {
        let result: string[] = [];

        if (member.child.length === 0) {
            return result;
        }

        let child: Child;

        for (let i = 0; i < member.child.length; i++) {
            child = member.child[i];
            if (child.gender === childGender) {
                result.push(child.name);
            }
        }

        return result;
    }

    private findFamilyMember(name: string): FamilyMember | null {
        let errorMessage: string = "PERSON_NOT_FOUND";

        if (name.length <= 0) {
            console.log(errorMessage);
            return null;
        }

        if (this.king === null || this.queen === null) {
            console.log(errorMessage);
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

        console.log(errorMessage);
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
