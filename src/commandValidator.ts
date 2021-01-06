export class CommandValidator {
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
}
