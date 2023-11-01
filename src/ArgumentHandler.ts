import { CommandOption } from './CommandOption';
import { Messages } from './Enum/Messages';
import { IFlag } from './Interface/IFlag';

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
        args.splice(0, 2);

        for (let i = 0; i < args.length; i++) {
            if (args[i].startsWith('--')) {
                const flag = args[i].slice(2);
                const commandOption = this.commandOptions.find((commandOption: CommandOption) => commandOption.getName() === flag);

                if (!commandOption) {
                    throw new Error(Messages.ERROR_UNKNOWN_FLAG.replace('%s', flag));
                }

                if (commandOption.requiresValue()) {
                    if ((i + 1) < args.length && !args[i + 1].startsWith('--')) {
                        this.addFlag(flag, args[i + 1], commandOption);

                        continue;
                    } else {
                        throw new Error(Messages.ERROR_MISSING_ARGUMENT_VALUE.replace('%s', flag));
                    }
                }

                this.addFlag(flag, null, commandOption);

                this.commandOptions.forEach((option: CommandOption) => {
                    if (option.isOptionRequired() && !this.flags.find((flag: IFlag) => flag.name === option.getName())) {
                        throw new Error(Messages.ERROR_MISSING_REQUIRED_FLAG.replace('%s', option.getName()));
                    }
                });
            }
        }
    }

    /**
     * @param {string} name
     * @param {string|null} value
     * @param {CommandOption} commandOption
     *
     * @private
     */
    private addFlag(name: string, value: string|null, commandOption: CommandOption): void
    {
        this.flags.push({
            name: name,
            value: value,
            commandOption: commandOption
        });
    }

    public getFlags(): Array<IFlag>
    {
        return this.flags;
    }
}

export { ArgumentHandler };