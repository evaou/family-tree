import { App } from "./src/app";

const treeFilePath: string = "./res/tree.txt";

let app = new App(treeFilePath);
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
