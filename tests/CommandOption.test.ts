import { CommandOption } from '../src/CommandOption';
import {JestCoverageGenerator} from "../src/Generators/JestCoverageGenerator";
import {ArgumentHandler} from "../src/ArgumentHandler";

const jestConsole = console;

beforeEach(() => {
    global.console = require('console');
});

afterEach(() => {
    global.console = jestConsole;
});

describe('Class: Command Option', () => {
    it('should create an instance of Command Option', () => {
        const commandOption = new CommandOption('jest', new JestCoverageGenerator(), false, true);

        expect(commandOption).toBeInstanceOf(CommandOption);
        expect(commandOption.isOptionRequired()).toBeFalsy();
        expect(commandOption.hasGenerator()).toBeTruthy();
        expect(commandOption.requiresValue()).toBeTruthy();
    });

    it('should set badge generator', () => {
        [['jest', new JestCoverageGenerator(), false, true], ['test', null, false, false]].forEach((arr: Array<any>) => {
            let commandOption = new CommandOption(arr[0], arr[1], arr[2], arr[3]);

            if (arr[1]) {
                expect(commandOption.hasGenerator()).toBeTruthy();
            } else {
                expect(commandOption.hasGenerator()).toBeFalsy();
            }
        });
    });

    it('should run badge generator', () => {
        let commandOption = new CommandOption('jest', new JestCoverageGenerator(), false, true);
        const consoleSpy = jest.spyOn(console, 'log');

        commandOption.runGenerator('./coverage/coverage-final.json');

        expect(consoleSpy).toBeCalledWith('Coverage Badge added to README.');
    });
});