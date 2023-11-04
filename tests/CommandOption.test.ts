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
        const defaultCommandOption = new CommandOption('default');

        expect(defaultCommandOption).toBeInstanceOf(CommandOption);
        expect(defaultCommandOption.isOptionRequired()).toBeFalsy();
        expect(defaultCommandOption.requiresValue()).toBeFalsy();

        const withTwoArgsCommandOption = new CommandOption('two-arg', true);

        expect(withTwoArgsCommandOption).toBeInstanceOf(CommandOption);
        expect(withTwoArgsCommandOption.isOptionRequired()).toBeTruthy();
        expect(withTwoArgsCommandOption.requiresValue()).toBeFalsy();

        const commandOption = new CommandOption('jest',false, true);

        expect(commandOption).toBeInstanceOf(CommandOption);
        expect(commandOption.isOptionRequired()).toBeFalsy();
        expect(commandOption.requiresValue()).toBeTruthy();

        const requiredFlagOnlyCommandOption = new CommandOption('cli', true, false);

        expect(requiredFlagOnlyCommandOption).toBeInstanceOf(CommandOption);
        expect(requiredFlagOnlyCommandOption.isOptionRequired()).toBeTruthy();
        expect(requiredFlagOnlyCommandOption.requiresValue()).toBeFalsy();

        const notRequiredFlagOnlyCommandOption = new CommandOption('cli-2', false, false);

        expect(notRequiredFlagOnlyCommandOption).toBeInstanceOf(CommandOption);
        expect(notRequiredFlagOnlyCommandOption.isOptionRequired()).toBeFalsy();
        expect(notRequiredFlagOnlyCommandOption.requiresValue()).toBeFalsy();

        const requiredValueCommandOption = new CommandOption('cli-2', true, true);

        expect(requiredValueCommandOption).toBeInstanceOf(CommandOption);
        expect(requiredValueCommandOption.isOptionRequired()).toBeTruthy();
        expect(requiredValueCommandOption.requiresValue()).toBeTruthy();
    });
});