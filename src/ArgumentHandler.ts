import { CommandOption } from './CommandOption';
import { IFlag } from './Interface/IFlag';
import { Messages } from './Enum/Messages';

class ArgumentHandler
{
    private commandOptions: Array<CommandOption> = [];
    private flags: Array<IFlag> = [];
    public readmePath?: string;
    public static argumentHandler: ArgumentHandler;

    constructor(args: Array<string>, additionalCommandOptions?: Array<CommandOption>)
    {
        if (ArgumentHandler.argumentHandler !== undefined) {
            throw new Error('Only a single instance of ArgumentHandler is expected.');
        }

        if (additionalCommandOptions) {
            additionalCommandOptions.forEach((commandOption: CommandOption) => {
                this.commandOptions.push(commandOption);
            });
        }

        this.setupCommandOptions();
        this.parseArguments(args);

        let readmeCommand = this.flags.find((flag: IFlag) => {
            return flag.commandOption.getName() === 'readme';
        });

        if (readmeCommand !== undefined) {
            this.readmePath = readmeCommand.value;
        }

        ArgumentHandler.argumentHandler = this;
    }

    /**
     * @returns {void}
     *
     * @private
     */
    private setupCommandOptions(): void
    {
        this.commandOptions.push(
            new CommandOption('jest', false, true)
        );
        this.commandOptions.push(
            new CommandOption('readme', false, true)
        );
        this.commandOptions.push(
            new CommandOption('version', false, true)
        );
        this.commandOptions.push(
            new CommandOption('license', false, true)
        )
    }

    /**
     * @param {Array<string>} args
     *
     * @private
     */
    private parseArguments(args: Array<string>): void
    {
        args.splice(0, 2);

        for (let i = 0; i < args.length; i++) {
            if (args[i].startsWith('--')) {
                const flag = args[i].slice(2);
                const commandOption = this.commandOptions.find((commandOption: CommandOption) => {
                    return commandOption.getName() === flag;
                });

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
            }
        }

        this.commandOptions.forEach((option: CommandOption) => {
            if (option.isOptionRequired() && !this.flags.find((flag: IFlag) => flag.name === option.getName())) {
                throw new Error(Messages.ERROR_MISSING_REQUIRED_FLAG.replace('%s', option.getName()));
            }
        });
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

    /**
     * @returns {Array<IFlag>}
     */
    public getFlags(): Array<IFlag>
    {
        return this.flags;
    }
}

export { ArgumentHandler };