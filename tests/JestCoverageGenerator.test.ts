import { ArgumentHandler } from '../src/ArgumentHandler';
import { CommandOption } from '../src/CommandOption';
import { JestCoverageGenerator } from '../src/Generators/JestCoverageGenerator';
import { Messages } from '../src/Enum/Messages';

const jestConsole = console;

beforeEach(() => {
    global.console = require('console');
});

afterEach(() => {
    global.console = jestConsole;
    ArgumentHandler.argumentHandler = undefined;
});

describe('Class: JestCoverageGenerator', () => {
    it('should create an instance of JestCoverageGenerator', () => {
        const jestCoverageGenerator = new JestCoverageGenerator();

        expect(jestCoverageGenerator).toBeInstanceOf(JestCoverageGenerator);
    });

    it('should set correct data', () => {
        const jestCoverageGenerator = new JestCoverageGenerator();

        expect(jestCoverageGenerator.generate(
            new CommandOption('jest', false, true),
            './coverage/coverage-final.json'
        )).resolves.toStrictEqual('Coverage Badge added to README.');
    });

    it('should throw an error when given an invalid filepath', () => {
        const jestCoverageGenerator = new JestCoverageGenerator();

        expect(jestCoverageGenerator.generate(
            new CommandOption('jest', false, true),
            './invalid/path'
        )).rejects.toStrictEqual(
            new Error(Messages.ERROR_READING_FROM_FILEPATH.replace('%s', './invalid/path'))
        );
    });

    it('should throw an error when called without filepath', () => {
        const jestCoverageGenerator = new JestCoverageGenerator();

        expect(jestCoverageGenerator.generate(
            new CommandOption('jest', false, true)
        )).rejects.toStrictEqual(Messages.ERROR_MISSING_ARGUMENT_VALUE.replace('%s', 'jest'));
    });

    it('should update README when using custom path', async () => {
        new ArgumentHandler([
            'C:\\Program Files\\nodejs\\node.exe',
            'C:\\Development\\Packages\\badger\\dist\\badger.js',
            '--jest',
            './coverage/coverage-final.json',
            '--readme',
            './tests/data/README.md',
        ]);

        const jestCoverageGenerator = new JestCoverageGenerator();

        await jestCoverageGenerator.generate(
            new CommandOption('jest', false, true),
            './coverage/coverage-final.json'
        ).then(data => {
            expect(data).toStrictEqual('Coverage Badge added to README.');
        });
    });

    it('should throw an error when the README path is invalid', () => {
        new ArgumentHandler([
            'C:\\Program Files\\nodejs\\node.exe',
            'C:\\Development\\Packages\\badger\\dist\\badger.js',
            '--jest',
            './coverage/coverage-final.json',
            '--readme',
            './invalid/path',
        ]);
        const jestCoverageGenerator = new JestCoverageGenerator();

        expect(jestCoverageGenerator.generate(
            new CommandOption('jest', false, true),
            './coverage/coverage-final.json'
        )).rejects.toStrictEqual('Error reading README file.');
    });
});