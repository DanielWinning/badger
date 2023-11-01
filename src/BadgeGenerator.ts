import { IFlag } from './Interface/IFlag';
import * as fs from 'fs';
import { CommandOption } from './CommandOption';
import { IBadgeGenerator } from './Interface/IBadgeGenerator';

class BadgeGenerator implements IBadgeGenerator
{
    commandOption: CommandOption;
    configPath?: string;
    data?: Record<string, any>;

    /**
     * @param {CommandOption} commandOption
     * @param {string?} arg
     *
     * @private
     */
    private setupData(commandOption: CommandOption, arg?: string): void
    {
        this.commandOption = commandOption;

        if (this.commandOption.requiresValue() && !arg) {
            throw new Error(`The --${this.commandOption.getName()} requires an argument.`);
        }

        this.configPath = arg;
        this.data = this.getJsonDataFromFilepath(this.configPath);
    }

    public generate(commandOption: CommandOption, arg?: string): void
    {
        this.setupData(commandOption, arg);
    }

    private getJsonDataFromFilepath(filepath: string): Record<string, any>
    {
        try {
            return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
        } catch (error) {
            throw new Error('Error reading the config file.');
        }
    }
}

export { BadgeGenerator };