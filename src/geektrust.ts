import { App } from "./app";

const treeFilePath: string = "./res/geektrust-tree.txt";

let app = new App(treeFilePath);
let args = process.argv.slice(2);
let testFilePath = args[0];
let commands: string[] = [];

if (args.length === 1) {
    commands = app.commandUtil.readFile(testFilePath);

    if (commands.length > 0) {
        app.runCommands(commands);
    }
}
