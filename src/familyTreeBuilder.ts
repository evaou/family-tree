import { FamilyMember } from "./familyMember";
import { CommandUtil } from "./commandUtil";
import { FamilyTree } from "./familyTree";

const treeFilePath: string = "./res/tree.txt";
const commandUtil = new CommandUtil();

export class FamilyTreeBuilder {
    private _king: FamilyMember | null;
    private _queen: FamilyMember | null;
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

    get king(): FamilyMember | null {
        return this._king;
    }

    get queen(): FamilyMember | null {
        return this._queen;
    }
}
