import { CommandOption } from '../CommandOption';

export interface IBadgeGenerator
{
    commandOption: CommandOption;
    configPath?: string;
    data?: Record<string, any>;

    generate(commandOption: CommandOption, arg?: string): void;
}