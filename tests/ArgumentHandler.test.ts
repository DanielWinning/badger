import { ArgumentHandler } from '../src/ArgumentHandler';

describe('Class: Argument Handler', () => {
    it('should create an instance of Argument Handler', () => {
        const argumentHandler = new ArgumentHandler([
            'C:\\Program Files\\nodejs\\node.exe',
            'C:\\Development\\Packages\\badger\\dist\\badger.js',
            '--json',
            './coverage/coverage-final.json',
        ]);
        expect(argumentHandler).toBeInstanceOf(ArgumentHandler);
        expect(argumentHandler.getFlags()).toStrictEqual([{name: 'json', value: './coverage/coverage-final.json'}]);
    });
});