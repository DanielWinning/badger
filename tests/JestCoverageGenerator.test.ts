import * as fs from 'fs';
import { ArgumentHandler } from '../src/ArgumentHandler';
import { CommandOption } from '../src/CommandOption';
import { JestCoverageGenerator } from '../src/Generators/JestCoverageGenerator';
import { Messages } from '../src/Enum/Messages';

afterEach(() => {
    ArgumentHandler.argumentHandler = undefined;
    fs.writeFileSync(
        './tests/data/README.md',
        `<!-- JS Coverage Badge -->\n<!-- Version Badge -->\n<!-- License Badge -->`
    );
});

describe('Class: JestCoverageGenerator', () => {
    it('should create an instance of JestCoverageGenerator', () => {
        const jestCoverageGenerator = new JestCoverageGenerator();

        expect(jestCoverageGenerator).toBeInstanceOf(JestCoverageGenerator);
    });

    it('should resolve with valid coverage path provided', async () => {
        const jestCoverageGenerator = new JestCoverageGenerator();

        await jestCoverageGenerator.generate(
            new CommandOption('jest', false, true),
            './coverage/coverage-final.json'
        ).then(data => {
            expect(data).toStrictEqual('JS Coverage Badge added to README.');
        });
    });

    it('should reject when provided an invalid filepath', async () => {
        const jestCoverageGenerator = new JestCoverageGenerator();

        await jestCoverageGenerator.generate(
            new CommandOption('jest', false, true),
            './invalid/path'
        ).catch(err => {
            expect(err).toStrictEqual(
                new Error(Messages.ERROR_READING_FROM_FILEPATH.replace('%s', './invalid/path'))
            );
        });
    });

    it('should reject when provided no filepath', async () => {
        const jestCoverageGenerator = new JestCoverageGenerator();

         await jestCoverageGenerator.generate(
            new CommandOption('jest', false, true)
        ).catch(err => {
            expect(err).toStrictEqual(Messages.ERROR_MISSING_ARGUMENT_VALUE.replace('%s', 'jest'));
        });
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
        ).then(async (data) => {
            expect(data).toStrictEqual('JS Coverage Badge added to README.');
        });
    });

    it('should reject when the README path is invalid', async () => {
        new ArgumentHandler([
            'C:\\Program Files\\nodejs\\node.exe',
            'C:\\Development\\Packages\\badger\\dist\\badger.js',
            '--jest',
            './coverage/coverage-final.json',
            '--readme',
            './invalid/path',
        ]);
        const jestCoverageGenerator = new JestCoverageGenerator();

        await jestCoverageGenerator.generate(
            new CommandOption('jest', false, true),
            './coverage/coverage-final.json'
        ).then().catch(err => {
            expect(err).toStrictEqual(`Error: ${Messages.ERROR_READING_README}`);
        });
    });
});