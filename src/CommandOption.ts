class CommandOption
{
    private readonly name: string;
    private readonly valueRequired: boolean = false;
    private readonly isRequired: boolean = false;

    constructor(name: string, isRequired: boolean = false, valueRequired: boolean = false) {
        this.name = name;
        this.isRequired = isRequired;
        this.valueRequired = valueRequired;
    }

    /**
     * @returns {string}
     */
    public getName(): string
    {
        return this.name;
    }

    /**
     * @returns {boolean}
     */
    public isOptionRequired(): boolean
    {
        return this.isRequired;
    }

    /**
     * @returns {boolean}
     */
    public isOptionValueRequired(): boolean
    {
        return this.valueRequired;
    }
}

export { CommandOption };