class ArgumentHandler
{
    private readonly REQUIRED_FLAGS: Array<string> = [
        'json',
    ];

    private flags: Array<string>;

    constructor(args: Array<string>)
    {
        console.log(args);
        this.parseOptions(args);
        console.log(args);
    }

    private parseOptions(args: Array<string>): void
    {
        args.splice(0, 2);
        let errors: Array<string> = [];

        this.flags = args.filter((arg: string) => {
            return arg.startsWith('--');
        });

        this.flags = this.flags.map((flag: string) => {
            return flag.replace('--', '');
        });

        this.REQUIRED_FLAGS.forEach((requiredFlag: string) => {
            if (!this.flags.includes(requiredFlag)) {
                errors.push(`Error: please provided the required --${requiredFlag} flag`);
            }
        });

        if (errors.length) {
            throw new Error(errors.join(' | '));
        }
    }
}

export { ArgumentHandler };