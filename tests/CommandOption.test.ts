import { CommandOption } from '../src/CommandOption';

const jestConsole = console;

beforeEach(() => {
    global.console = require('console');
});

afterEach(() => {
    global.console = jestConsole;
});

describe('Class: Command Option', () => {
    it('should create an instance of Command Option', () => {
        const commandOption = new CommandOption('jest',false, true);

        expect(commandOption).toBeInstanceOf(CommandOption);
        expect(commandOption.isOptionRequired()).toBeFalsy();
        expect(commandOption.requiresValue()).toBeTruthy();
    });
});