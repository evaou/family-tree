export enum Gender {
    Male,
    Female,
}
export class FamilyMember {
    name: string;
    gender: Gender;
    spouse: FamilyMember | null;
    child: Child[];
    father: Father;
    mother: Mother;

    constructor(name: string, gender: string) {
        this.name = name;

        if (gender === "Male") {
            this.gender = Gender.Male;
        } else if (gender === "Female") {
            this.gender = Gender.Female;
        }

        this.spouse = null;
        this.child = [];
    }

    addSpouse(spouse: FamilyMember): void {
        this.spouse = spouse;
        spouse.spouse = this;
    }

    addChild(childName: string, gender: string): boolean {
        let errorMessage: string = "CHILD_ADDITION_FAILED";

        if (!this.spouse || this.gender !== Gender.Female) {
            console.log(errorMessage);
            return false;
        }

        let child = new Child(this, childName, gender);
        this.child.push(child);
        this.spouse.child.push(child);

        return true;
    }
}

export class Father extends FamilyMember {
    constructor(name: string) {
        super(name, "Male");
    }
}

export class Mother extends FamilyMember {
    constructor(name: string) {
        super(name, "Female");
    }
}

export class Child extends FamilyMember {
    constructor(mother: Mother, childName: string, gender: string) {
        super(childName, gender);
        this.mother = mother;
        this.father = this.mother.spouse;
    }
}
