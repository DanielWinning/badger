import { ArgumentHandler } from '../src/ArgumentHandler';
import { CommandOption } from '../src/CommandOption';
import { Messages } from '../src/Enum/Messages';

const jestCommand = new CommandOption(
    'jest',
    false,
    true
);

afterEach(() => {
    ArgumentHandler.argumentHandler = undefined;
});

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

    it('should throw an error when called without required arguments', () => {
       expect(() => {
           new ArgumentHandler(
               [
                   'C:\\Program Files\\nodejs\\node.exe',
                   'C:\\Development\\Packages\\badger\\dist\\badger.js',
                   '--jest',
                   './coverage/coverage-final.json',
               ],
               [
                   new CommandOption('test', true, false),
               ]
           );
       }).toThrowError(Messages.ERROR_MISSING_REQUIRED_FLAG.replace('%s', 'test'));
    });

    it('should add create an instance of ArgumentHandler when provided flags with no required value', () => {
        const argumentHandler = new ArgumentHandler(
            [
                'C:\\Program Files\\nodejs\\node.exe',
                'C:\\Development\\Packages\\badger\\dist\\badger.js',
                '--jest',
                './coverage/coverage-final.json',
                '--test',
            ],
            [
                new CommandOption('test', false, false),
            ]
        );

        expect(argumentHandler).toBeInstanceOf(ArgumentHandler);
    });

    it('should throw an error when more than one instance of ArgumentHandler is created', () => {
        new ArgumentHandler([]);

        expect(() => {
            new ArgumentHandler([])
        }).toThrowError();
    });
});