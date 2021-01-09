import { CommandUtil } from "./commandUtil";
import { FamilyTree } from "./familyTree";
import { FamilyTreeBuilder } from "./familyTreeBuilder";

export class App {
    tree: FamilyTree;
    commandUtil: CommandUtil = new CommandUtil();

    constructor(treeFilePath: string) {
        this.tree = new FamilyTreeBuilder(treeFilePath).build();
    }

    runCommands(commands: string[]): void {
        let result: string;

        for (let i = 0; i < commands.length; i++) {
            result = this.commandUtil.execute(commands[i], this.tree);
            if (result.length > 0) {
                console.log(result);
            }
        }
    }
}
