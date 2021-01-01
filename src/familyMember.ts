import { Gender } from "./familyAttribute";

export class FamilyMember {
    name: string;
    gender: Gender;

    constructor(name: string, gender: string) {
        this.name = name;

        if (gender === "Male") {
            this.gender = Gender.Male;
        } else if (gender === "Female") {
            this.gender = Gender.Female;
        }
    }
}

export class Father extends FamilyMember {
    child: Child[];
    spouse: Mother | null;

    constructor(name: string) {
        super(name, "Male");
        this.child = [];
        this.spouse = null;
    }
}

export class Mother extends FamilyMember {
    child: Child[];
    spouse: Father | null;

    constructor(name: string) {
        super(name, "Female");
        this.child = [];
        this.spouse = null;
    }
}

export class Child extends FamilyMember {
    father: Father;
    mother: Mother;
}
