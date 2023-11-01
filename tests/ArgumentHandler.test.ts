import { ArgumentHandler } from '../src/ArgumentHandler';
import {CommandOption} from "../src/CommandOption";

describe('Class: Argument Handler', () => {
    it('should create an instance of Argument Handler', () => {
        const argumentHandler = new ArgumentHandler([
            'C:\\Program Files\\nodejs\\node.exe',
            'C:\\Development\\Packages\\badger\\dist\\badger.js',
            '--json',
            './coverage/coverage-final.json',
        ]);
        const commandOption = new CommandOption('json', true, true);

        expect(argumentHandler).toBeInstanceOf(ArgumentHandler);
        expect(argumentHandler.getFlags())
            .toStrictEqual([
                {
                    name: 'json',
                    value: './coverage/coverage-final.json',
                    commandOption: commandOption
                },
            ]);

        const argumentHandlerB = new ArgumentHandler([
            'C:\\Program Files\\nodejs\\node.exe',
            'C:\\Development\\Packages\\badger\\dist\\badger.js',
            '--json',
            './coverage/coverage-final.json',
            '--jest',
        ]);
        const commandOptionB = new CommandOption('jest', false, false);

        expect(argumentHandlerB).toBeInstanceOf(ArgumentHandler);
        expect(argumentHandlerB.getFlags()).toStrictEqual([
            {
                name: 'json',
                value: './coverage/coverage-final.json',
                commandOption: commandOption
            },
            {
                name: 'jest',
                value: null,
                commandOption: commandOptionB
            },
        ]);
    });

    it('should throw an error when passed an invalid flag', () => {
        expect(() => {
            new ArgumentHandler([
                'C:\\Program Files\\nodejs\\node.exe',
                'C:\\Development\\Packages\\badger\\dist\\badger.js',
                '--json',
                './coverage/coverage-final.json',
                '--invalidFlag',
            ]);
        }).toThrowError();
    });

    it('should throw an error when a flag is passed with no value when value is required', () => {
        expect(() => {
            new ArgumentHandler([
                'C:\\Program Files\\nodejs\\node.exe',
                'C:\\Development\\Packages\\badger\\dist\\badger.js',
                '--json',
            ]);
        }).toThrowError();
    });

    it('should throw an error when missing a required flag', () => {
        expect(() => {
            new ArgumentHandler([
                'C:\\Program Files\\nodejs\\node.exe',
                'C:\\Development\\Packages\\badger\\dist\\badger.js',
                '--jest',
            ]);
        }).toThrowError();
    });
});