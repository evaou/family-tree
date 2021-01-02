import * as fs from "fs";
import { FamilyTree } from "./familyTree";
class App {
    private commands: string[];
    tree: FamilyTree = new FamilyTree();

    constructor() {
        this.commands = [];
    }

    readFile(filePath: string): boolean {
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

        for (let i = 0; i < this.commands.length; i++) {
            command = this.commands[i];
            if (command.length === 0) {
                continue;
            }

            action = command.split(" ")[0];
            parameters = command.split(" ").slice(1);

            switch (action) {
                case "ADD_CHILD":
                    this.tree.addChild(
                        parameters[0],
                        parameters[1],
                        parameters[2]
                    );
                    break;
                case "GET_RELATIONSHIP":
                    this.tree.getRelationship(parameters[0], parameters[1]);
                    break;
                default:
                    break;
            }
        }
    }
}

export default new App();
