import * as fs from "fs";
import { CommandValidator } from "./commandValidator";
import { FamilyTree } from "./familyTree";
export class App {
    private commands: string[];
    tree: FamilyTree = new FamilyTree();
    validator: CommandValidator = new CommandValidator();

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
        if (this.commands.length === 0) {
            return;
        }

        let command: string;
        let action: string;
        let parameters: any[];
        let result: string;

        for (let i = 0; i < this.commands.length; i++) {
            command = this.commands[i];
            if (command.length === 0) {
                continue;
            }

            if (!this.validator.isValidCommand(command)) {
                console.log("Invalid command format\n" + command);
                return;
            }

            action = command.split(" ")[0];
            parameters = command.split(" ").slice(1);

            switch (action) {
                case "ADD_CHILD":
                    result = this.tree.addChild(
                        parameters[0],
                        parameters[1],
                        parameters[2]
                    );
                    console.log(result);
                    break;
                case "GET_RELATIONSHIP":
                    result = this.tree.getRelationship(
                        parameters[0],
                        parameters[1]
                    );
                    console.log(result);
                    break;
                default:
                    break;
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
