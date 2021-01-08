export enum Gender {
    Male,
    Female,
}
export class FamilyMember {
    name: string;
    gender: Gender;
    spouse: FamilyMember;
    child: FamilyMember[];
    father: FamilyMember;
    mother: FamilyMember;

    constructor(name: string, gender: string) {
        this.name = name;

        if (gender === "Male") {
            this.gender = Gender.Male;
        } else if (gender === "Female") {
            this.gender = Gender.Female;
        }

        this.spouse = null;
        this.child = [];
        this.father = null;
        this.mother = null;
    }

    addSpouse(spouse: FamilyMember): void {
        this.spouse = spouse;
        spouse.spouse = this;
    }

    addChild(childName: string, gender: string): FamilyMember | null {
        if (!this.spouse || this.gender !== Gender.Female) {
            return null;
        }

        let child = new FamilyMember(childName, gender);
        child.mother = this;
        child.father = child.mother.spouse;

        this.child.push(child);
        this.spouse.child.push(child);

        return child;
    }
}
