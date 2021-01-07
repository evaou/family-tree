import { FamilyTree } from "./familyTree"
import { FamilyMember, Child, Gender } from "./familyMember"

export class Relationship {
    construct() {}

    find(tree: FamilyTree, name: string, relationship: string): string {
        if (name.length <= 0) {
            return;
        }

        let member = tree.findFamilyMember(name);

        if (!member) {
            return "PERSON_NOT_FOUND";
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
                if (member.spouse) {
                    result = this.getSibling(member.spouse, Gender.Female);
                }
                siblingSpouses = this.getSiblingSpouse(member, Gender.Female);
                result = result.concat(siblingSpouses);
                break;
            case "Brother-In-Law":
                if (member.spouse) {
                    result = this.getSibling(member.spouse, Gender.Male);
                }
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
            return result.join(" ");
        } else {
            return "NONE";
        }
    }

    private getSibling(
        member: FamilyMember,
        siblingGender: Gender = -1
    ): string[] {
        let mother = member.mother;
        let siblings: string[] = [];
        let child: Child;

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
}
