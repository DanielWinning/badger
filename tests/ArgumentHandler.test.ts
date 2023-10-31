import { ArgumentHandler } from '../src/ArgumentHandler';

describe('Class: Argument Handler', () => {
    it('should create an instance of Argument Handler', () => {
        const argumentHandler = new ArgumentHandler([
            'C:\\Program Files\\nodejs\\node.exe',
            'C:\\Development\\Packages\\badger\\dist\\badger.js',
            '--json',
        ]);
        expect(argumentHandler).toBeInstanceOf(ArgumentHandler);
    });
    it('should throw an error when not provided with required flags', () => {
        expect(() => {
            new ArgumentHandler([
                'C:\\Program Files\\nodejs\\node.exe',
                'C:\\Development\\Packages\\badger\\dist\\badger.js',
            ]);
        }).toThrowError('Error: please provided the required --json flag');
    })
});