import * as fs from "fs";
class App {
    private commands: string[];

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

        for (let i = 0; i < this.commands.length; i++) {
            command = this.commands[i];
            if (command.length === 0) {
                continue;
            }

            action = command.split(" ")[0];
            console.log(action);
        }
    }
}

export default new App();
