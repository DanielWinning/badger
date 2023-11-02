import { CommandOption } from '../CommandOption';

export interface IBadgeGenerator
{
    name: string;
    commandOption: CommandOption;
    configPath?: string;
    data?: Record<string, any>;
    isPercentage: boolean;

    generate(commandOption: CommandOption, arg?: string): void;
}