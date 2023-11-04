import { ArgumentHandler } from '../src/ArgumentHandler';
import { CommandOption } from '../src/CommandOption';
import { VersionGenerator } from '../src/Generators/VersionGenerator';
import {Messages} from "../src/Enum/Messages";

const jestConsole = console;

beforeEach(() => {
    global.console = require('console');
});

afterEach(() => {
    global.console = jestConsole;
    ArgumentHandler.argumentHandler = undefined;
});

describe('Class: VersionGenerator', () => {
    it('should create an instance of VersionGenerator', () => {
        const versionGenerator = new VersionGenerator();

        expect(versionGenerator).toBeInstanceOf(VersionGenerator);
        expect(versionGenerator.getName()).toStrictEqual('Version');
    });

    it('should reject if no filepath is provided', async () => {
        const versionGenerator = new VersionGenerator();

        await versionGenerator.generate(
            new CommandOption('version', false, true)
        ).then().catch(err => {
            expect(err).toStrictEqual(Messages.ERROR_MISSING_ARGUMENT_VALUE.replace('%s', 'version'));
        });
    });

    it('should reject when provided an invalid README path', async () => {
        new ArgumentHandler([
            'C:\\Program Files\\nodejs\\node.exe',
            'C:\\Development\\Packages\\badger\\dist\\badger.js',
            '--version',
            './package.json',
            '--readme',
            './invalid/path',
        ]);
        const versionGenerator = new VersionGenerator();

        await versionGenerator.generate(
            new CommandOption('version', false, true),
            './package.json'
        ).then().catch(err => {
            expect(err).toStrictEqual(Messages.ERROR_READING_README);
        });
    });

    it('should return correct colour string from provided percentage', () => {
        const versionGenerator = new VersionGenerator();

        expect(versionGenerator.getStatusFromPercentageString('90')).toStrictEqual('green');
        expect(versionGenerator.getStatusFromPercentageString('80')).toStrictEqual('yellow');
        expect(versionGenerator.getStatusFromPercentageString('70')).toStrictEqual('orange');
        expect(versionGenerator.getStatusFromPercentageString('60')).toStrictEqual('red');
    });
});