import { CommandOption } from '../src/CommandOption';

describe('Class: Command Option', () => {
    it('should create an instance of Command Option', () => {
        const commandOption = new CommandOption('test');

        expect(commandOption).toBeInstanceOf(CommandOption);
    });
});