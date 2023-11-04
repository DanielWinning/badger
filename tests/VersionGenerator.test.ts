import { ArgumentHandler } from '../src/ArgumentHandler';
import { VersionGenerator } from '../src/Generators/VersionGenerator';

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
});