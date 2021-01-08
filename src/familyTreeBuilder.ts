import { FamilyMember } from "./familyMember";
import { CommandUtil } from "./commandUtil";
import { FamilyTree } from "./familyTree";

const treeFilePath: string = "./res/tree.txt";
const commandUtil = new CommandUtil();

export class FamilyTreeBuilder {
    private _king: FamilyMember;
    private _queen: FamilyMember;
    private _tree: FamilyTree;
    private _filePath: string;

    constructor(filePath: string = treeFilePath) {
        this._filePath = filePath;
        this._tree = new FamilyTree(this);
    }

    build(): FamilyTree {
        let commands = commandUtil.readFile(this._filePath);

        for (let i = 0; i < commands.length; i++) {
            commandUtil.execute(commands[i], this._tree);
        }

        return this._tree;
    }

    get king(): FamilyMember {
        return this._king;
    }

    get queen(): FamilyMember {
        return this._queen;
    }
}
