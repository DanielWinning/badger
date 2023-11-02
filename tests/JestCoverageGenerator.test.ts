import { CommandOption } from '../src/CommandOption';
import { JestCoverageGenerator } from '../src/Generators/JestCoverageGenerator';
import {ArgumentHandler} from "../src/ArgumentHandler";

const jestConsole = console;

beforeEach(() => {
    global.console = require('console');
});

afterEach(() => {
    global.console = jestConsole;
});

describe('Class: JestCoverageGenerator', () => {
    it('should create an instance of JestCoverageGenerator', () => {
        const jestCoverageGenerator = new JestCoverageGenerator();

        expect(jestCoverageGenerator).toBeInstanceOf(JestCoverageGenerator);
    });

    it('should set correct data', () => {
        const jestCoverageGenerator = new JestCoverageGenerator();
        const consoleSpy = jest.spyOn(console, 'log');

        jestCoverageGenerator.generate(
            new CommandOption('jest', new JestCoverageGenerator(), false, true),
            './coverage/coverage-final.json'
        );

        expect(jestCoverageGenerator.name).toStrictEqual('Coverage');
        expect(consoleSpy).toHaveBeenCalledWith('Coverage Badge added to README.');
    });

    it('should throw an error when given an invalid filepath', () => {
        const jestCoverageGenerator = new JestCoverageGenerator();

        expect(() => {
            jestCoverageGenerator.generate(
                new CommandOption('jest', new JestCoverageGenerator(), false, true),
                './invalid/path'
            );
        }).toThrowError();
    });

    it('should throw an error when called without filepath', () => {
        expect(() => {
            const jestCoverageGenerator = new JestCoverageGenerator();

            jestCoverageGenerator.generate(
                new CommandOption('jest', new JestCoverageGenerator(), false, true)
            );
        }).toThrowError();
    });

    it('should update README when using custom path', () => {
        new ArgumentHandler([
            'C:\\Program Files\\nodejs\\node.exe',
            'C:\\Development\\Packages\\badger\\dist\\badger.js',
            '--jest',
            './coverage/coverage-final.json',
            '--readme',
            './tests/data/README.md',
        ]);
        const jestCoverageGenerator = new JestCoverageGenerator();
        const consoleSpy = jest.spyOn(console, 'log');

        jestCoverageGenerator.generate(
            new CommandOption('jest', new JestCoverageGenerator(), false, true),
            './coverage/coverage-final.json'
        );

        expect(consoleSpy).toBeCalledWith('Coverage Badge added to README.');
    });

    it('should throw an error when the README path is invalid', () => {
        expect(() => {
            new ArgumentHandler([
                'C:\\Program Files\\nodejs\\node.exe',
                'C:\\Development\\Packages\\badger\\dist\\badger.js',
                '--jest',
                './coverage/coverage-final.json',
                '--readme',
                './invalid/path',
            ]);
            const jestCoverageGenerator = new JestCoverageGenerator();

            jestCoverageGenerator.generate(
                new CommandOption('jest', new JestCoverageGenerator(), false, true),
                './coverage/coverage-final.json'
            );
        }).toThrowError();
    });
});