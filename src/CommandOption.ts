import { BadgeGenerator } from './BadgeGenerator';

class CommandOption
{
    private readonly name: string;
    private readonly valueRequired: boolean = false;
    private readonly isRequired: boolean = false;
    private readonly badgeGenerator?: BadgeGenerator;

    constructor(name: string, badgeGenerator: BadgeGenerator = null, isRequired: boolean = false, valueRequired: boolean = false) {
        this.name = name;
        this.badgeGenerator = badgeGenerator;
        this.isRequired = isRequired;
        this.valueRequired = valueRequired;
    }

    /**
     * @returns {boolean}
     */
    public hasGenerator(): boolean
    {
        return this.badgeGenerator !== null;
    }

    /**
     * @param {string?} arg
     */
    public runGenerator(arg?: string): void
    {
        this.badgeGenerator.generate(this, arg);
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
    public requiresValue(): boolean
    {
        return this.valueRequired;
    }
}

export { CommandOption };