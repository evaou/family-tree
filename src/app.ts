import * as fs from "fs";
import { CommandUtil } from "./commandUtil";
import { FamilyTree } from "./familyTree";
export class App {
    private commands: string[];
    tree: FamilyTree = new FamilyTree();
    commandUtil: CommandUtil = new CommandUtil();

    constructor() {
        this.commands = [];
    }

    readFile(filePath: string): boolean {
        if (!fs.existsSync(filePath)) {
            return false;
        }

        let data: Buffer = fs.readFileSync(filePath);
        this.commands = data.toString().split("\n");

        return true;
    }

    runCommands(): void {
        let result: string;

        for (let i = 0; i < this.commands.length; i++) {
            result = this.commandUtil.execute(this.commands[i], this.tree);
            if (result.length > 0) {
                console.log(result);
            }
        }
    }
}

let app = new App();
let args = process.argv.slice(2);
let testFilePath = args[0];
let regStr: RegExp = /^(\.\/)?shippit-input\//;

if (args.length > 1) {
} else if (app.readFile(testFilePath)) {
    app.runCommands();
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
