import {CommandOption} from "./CommandOption";

class ArgumentHandler
{
    private commandOptions: Array<CommandOption> = [];
    private flags: Array<any> = [];

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
    }

    /**
     * @param {Array<string>} args
     *
     * @returns {void}
     *
     * @private
     */
    private parseArguments(args: Array<string>): void
    {
        args.splice(0, 2);

        let errors: Array<string> = [];

        this.commandOptions.forEach(commandOption => {
            let optionValue = args[args.indexOf(`--${commandOption.getName()}`) + 1];

            if (commandOption.isOptionRequired()) {
                if (!args.includes(`--${commandOption.getName()}`)) {
                    errors.push(`Please provide the ${commandOption.getName()} flag`);
                }
            }

            if (commandOption.isOptionValueRequired()) {
                if (optionValue === undefined || optionValue.startsWith('--')) {
                    errors.push(`The ${commandOption.getName()} flag requires a value input`);
                }
            }

            if (errors.length) {
                throw new Error(errors.join(', '));
            }

            this.flags.push({
                name: commandOption.getName(),
                value: optionValue,
            });
        });
    }
}

export { ArgumentHandler };