import { FamilyTree } from "./familyTree";
import * as fs from "fs";

export class CommandUtil {
    commandSet: { [key: string]: number };

    constructor() {
        this.commandSet = {
            ADD_CHILD: 3,
            GET_RELATIONSHIP: 2,
            ADD_KING_QUEEN: 2,
            ADD_SPOUSE: 3,
        };
    }

    isValidCommand(command: string): boolean {
        let action = command.split(" ")[0];
        let parameters = command.trimEnd().split(" ").slice(1);

        if (!(action in this.commandSet)) {
            return false;
        }

        if (this.commandSet[action] !== parameters.length) {
            return false;
        }

        return true;
    }

    execute(command: string, tree: FamilyTree): string {
        let action: string;
        let parameters: any[];
        let result: string = "";

        if (command.length === 0) {
            return result;
        }

        if (!this.isValidCommand(command)) {
            console.log("Invalid command format\n" + command);
            return result;
        }

        action = command.split(" ")[0];
        parameters = command.split(" ").slice(1);

        switch (action) {
            case "ADD_CHILD":
                result = tree.addChild(
                    parameters[0],
                    parameters[1],
                    parameters[2]
                );
                break;
            case "GET_RELATIONSHIP":
                result = tree.getRelationship(parameters[0], parameters[1]);
                break;
            case "ADD_KING_QUEEN":
                result = tree.addKingQueen(parameters[0], parameters[1]);
                break;
            case "ADD_SPOUSE":
                result = tree.addSpouse(
                    parameters[0],
                    parameters[1],
                    parameters[2]
                );
                break;
            default:
                break;
        }

        return result;
    }

    readFile(filePath: string): string[] {
        let commands: string[] = [];

        if (!fs.existsSync(filePath)) {
            return commands;
        }

        let data: Buffer = fs.readFileSync(filePath);
        commands = data.toString().split("\n");

        return commands;
    }
}
