import { CommandOption } from '../CommandOption';

export interface IFlag
{
    name: string;
    value: string|null;
    commandOption: CommandOption;
}