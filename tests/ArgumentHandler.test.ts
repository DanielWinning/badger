import { ArgumentHandler } from '../src/ArgumentHandler';
import { CommandOption } from '../src/CommandOption';
import { Messages } from '../src/Enum/Messages';
import {JestCoverageGenerator} from "../src/Generators/JestCoverageGenerator";

const jestCommand = new CommandOption(
    'jest',
    new JestCoverageGenerator(),
    false,
    true
);

describe('Class: Argument Handler', () => {
    it('should create an instance of Argument Handler', () => {
        const argumentHandler = new ArgumentHandler([
            'C:\\Program Files\\nodejs\\node.exe',
            'C:\\Development\\Packages\\badger\\dist\\badger.js',
            '--jest',
            './coverage/coverage-final.json',
        ]);

        expect(argumentHandler).toBeInstanceOf(ArgumentHandler);
        expect(argumentHandler.getFlags())
            .toStrictEqual([
                {
                    name: 'jest',
                    value: './coverage/coverage-final.json',
                    commandOption: jestCommand
                },
            ]);
    });

    it('should throw an error when passed an invalid flag', () => {
        expect(() => {
            new ArgumentHandler([
                'C:\\Program Files\\nodejs\\node.exe',
                'C:\\Development\\Packages\\badger\\dist\\badger.js',
                '--invalidFlag',
            ]);
        }).toThrowError(Messages.ERROR_UNKNOWN_FLAG.replace('%s', 'invalidFlag'));
    });

    it('should throw an error when a flag is passed with no value when value is required', () => {
        expect(() => {
            new ArgumentHandler([
                'C:\\Program Files\\nodejs\\node.exe',
                'C:\\Development\\Packages\\badger\\dist\\badger.js',
                '--jest',
            ]);
        }).toThrowError(Messages.ERROR_MISSING_ARGUMENT_VALUE.replace('%s', 'jest'));
    });
});