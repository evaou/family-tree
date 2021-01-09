import { CommandUtil } from "./commandUtil";
import { FamilyTree } from "./familyTree";
import { FamilyTreeBuilder } from "./familyTreeBuilder";
export class App {
    tree: FamilyTree;
    commandUtil: CommandUtil = new CommandUtil();

    constructor(treeFilePath?: string) {
        if (treeFilePath) {
            this.tree = new FamilyTreeBuilder(treeFilePath).build();
        } else {
            this.tree = new FamilyTreeBuilder().build();
        }
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
/*
let app = new App();
let args = process.argv.slice(2);
let testFilePath = args[0];
let regStr: RegExp = /^(\.\/)?input\//;
let commands: string[] = [];

if (args.length === 1) {
    commands = app.commandUtil.readFile(testFilePath);

    if (commands.length > 0) {
        app.runCommands(commands);
    } else {
        if (testFilePath.match(regStr)) {
            testFilePath = testFilePath.replace(regStr, "");
            console.log(
                "Below file doesn't exist under mounted host directory\n" +
                    testFilePath
            );
        } else {
            console.log("Below file doesn't exist\n" + testFilePath);
        }
    }
}
*/