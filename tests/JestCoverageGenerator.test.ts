import * as fs from 'fs';
import { ArgumentHandler } from '../src/ArgumentHandler';
import { CommandOption } from '../src/CommandOption';
import { JestCoverageGenerator } from '../src/Generators/JestCoverageGenerator';
import { Messages } from '../src/Enum/Messages';

const coverageData = (): object => {
    return {
        "badger\\src\\Generators\\ArgumentHandler.ts": {
            "path": "badger\\src\\ArgumentHandler.ts",
            "statementMap": {
                "0": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line":1,
                        "column": 48
                    }
                },
                "1": {
                    "start": {
                        "line": 3,
                        "column": 0
                    },
                    "end": {
                        "line":3,
                        "column": 43
                    }
                },
            },
            "f": {
                "0": 1,
                "1": 0,
                "2": 0,
                "3": 0,
                "4": 0,
                "5": 0
            },
            "b": {
                "0": [0],
                "1": [0],
                "2": [0],
                "3" :[0,0]
            },
            "s":{
                "0": 1,
                "1": 1,
                "2": 1,
                "3": 0,
                "4": 0,
                "5": 0
            }
        }
    };
}

afterEach((): void => {
    ArgumentHandler.argumentHandler = undefined;
    fs.writeFileSync(
        './tests/data/README.md',
        `<!-- JS Coverage Badge -->\n<!-- Version Badge -->\n<!-- License Badge -->`
    );
});

describe('Class: JestCoverageGenerator', () => {
    it('should create an instance of JestCoverageGenerator', (): void => {
        const jestCoverageGenerator: JestCoverageGenerator = new JestCoverageGenerator();

        expect(jestCoverageGenerator).toBeInstanceOf(JestCoverageGenerator);
    });

    it('should resolve with valid coverage path provided', async (): Promise<void> => {
        const jestCoverageGenerator: JestCoverageGenerator = new JestCoverageGenerator();

        if (!fs.existsSync('/tmp')) fs.mkdirSync('/tmp');

        fs.writeFileSync('/tmp/coverage-final.json', JSON.stringify(coverageData()));

        await jestCoverageGenerator.generate(
            new CommandOption('jest', false, true),
            '/tmp/coverage-final.json'
        ).then(data => {
            expect(data).toStrictEqual('JS Coverage Badge added to README.');
        });
    });

    it('should reject when provided an invalid filepath', async (): Promise<void> => {
        const jestCoverageGenerator: JestCoverageGenerator = new JestCoverageGenerator();

        await jestCoverageGenerator.generate(
            new CommandOption('jest', false, true),
            './invalid/path'
        ).catch(err => {
            expect(err).toStrictEqual(
                new Error(Messages.ERROR_READING_FROM_FILEPATH.replace('%s', './invalid/path'))
            );
        });
    });

    it('should reject when provided no filepath', async (): Promise<void> => {
        const jestCoverageGenerator = new JestCoverageGenerator();

         await jestCoverageGenerator.generate(
            new CommandOption('jest', false, true)
        ).catch(err => {
            expect(err).toStrictEqual(Messages.ERROR_MISSING_ARGUMENT_VALUE.replace('%s', 'jest'));
        });
    });

    it('should update README when using custom path', async (): Promise<void> => {
        new ArgumentHandler([
            'C:\\Program Files\\nodejs\\node.exe',
            'C:\\Development\\Packages\\badger\\dist\\badger.js',
            '--jest',
            './coverage/coverage-final.json',
            '--readme',
            './tests/data/README.md',
        ]);

        if (!fs.existsSync('/tmp')) fs.mkdirSync('/tmp');

        fs.writeFileSync('/tmp/coverage-final.json', JSON.stringify(coverageData()));

        const jestCoverageGenerator: JestCoverageGenerator = new JestCoverageGenerator();

        await jestCoverageGenerator.generate(
            new CommandOption('jest', false, true),
            '/tmp/coverage-final.json'
        ).then(async (data) => {
            expect(data).toStrictEqual('JS Coverage Badge added to README.');
        });
    });

    it('should reject when the README path is invalid', async (): Promise<void> => {
        new ArgumentHandler([
            'C:\\Program Files\\nodejs\\node.exe',
            'C:\\Development\\Packages\\badger\\dist\\badger.js',
            '--jest',
            './coverage/coverage-final.json',
            '--readme',
            './invalid/path',
        ]);

        if (!fs.existsSync('/tmp')) fs.mkdirSync('/tmp');

        fs.writeFileSync('/tmp/coverage-final.json', JSON.stringify(coverageData()));

        const jestCoverageGenerator: JestCoverageGenerator = new JestCoverageGenerator();

        await jestCoverageGenerator.generate(
            new CommandOption('jest', false, true),
            '/tmp/coverage-final.json'
        ).then().catch(err => {
            expect(err).toStrictEqual(`Error: ${Messages.ERROR_READING_README}`);
        });
    });
});