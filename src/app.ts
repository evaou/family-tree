import * as fs from "fs";
class App {
    inputs: string[];

    constructor() {
        this.inputs = [];
    }

    readFile(filePath: string): boolean {
        let data: Buffer = fs.readFileSync(filePath);
        this.inputs = data.toString().split("\n");

        return true;
    }

    runCommands(): void {
        if (this.inputs.length === 0) {
            return;
        }

        let command: string;
        let action: string;

        for (let i = 0; i < this.inputs.length; i++) {
            command = this.inputs[i];
            if (command.length === 0) {
                continue;
            }

            action = command.split(" ")[0];
            console.log(action);
        }
    }
}

export default new App();
