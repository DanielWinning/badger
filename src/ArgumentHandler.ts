import { CommandOption } from './CommandOption';
import { Messages } from './Enum/Messages';
import {IFlag} from "./Interface/IFlag";

class ArgumentHandler
{
    private commandOptions: Array<CommandOption> = [];
    private flags: Array<IFlag> = [];

    constructor(args: Array<string>)
    {
        this.setupCommandOptions();
        this.parseArguments(args);
    }

    /**
     * @returns {void}
     *
     * @private
     */
    private setupCommandOptions(): void
    {
        this.commandOptions.push(new CommandOption('json', true, true));
        this.commandOptions.push(new CommandOption('jest', false, false));
    }

    private parseArguments(args: Array<string>): void
    {
        for (let i = 0; i < args.length; i++) {
            if (args[i].startsWith('--')) {
                const flag = args[i].slice(2);
                const commandOption = this.commandOptions.find((commandOption: CommandOption) => commandOption.getName() === flag);

                if (!commandOption) {
                    throw new Error(`Unknown flag: --${flag}`);
                }

                if (commandOption.requiresValue()) {
                    if ((i + 1) < args.length && !args[i + 1].startsWith('--')) {
                        this.flags.push({
                            name: flag,
                            value: args[i + 1],
                            commandOption: commandOption
                        });

                        continue;
                    } else {
                        throw new Error(`Flag --${flag} requires a value.`);
                    }
                }

                this.flags.push({
                    name: flag,
                    value: null,
                    commandOption: commandOption
                });

                this.commandOptions.forEach((option: CommandOption) => {
                    if (option.isOptionRequired() && !this.flags.find((flag: IFlag) => flag.name === option.getName())) {
                        throw new Error(Messages.ERROR_MISSING_REQUIRED_FLAG.replace('%s', option.getName()));
                    }
                });
            }
        }
    }

    public getFlags(): Array<object>
    {
        return this.flags;
    }
}

export { ArgumentHandler };