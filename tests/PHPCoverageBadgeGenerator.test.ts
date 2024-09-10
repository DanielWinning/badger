import { ArgumentHandler } from '../src/ArgumentHandler';
import fs from 'fs';
import {PHPCoverageBadgeGenerator} from '../src/Generators/PHPCoverageBadgeGenerator';
import {CommandOption} from '../src/CommandOption';

afterEach((): void => {
    ArgumentHandler.argumentHandler = undefined;
    fs.writeFileSync(
        './tests/data/README.md',
        `<!-- JS Coverage Badge -->\n<!-- Version Badge -->\n<!-- License Badge -->\n<!-- PHP Coverage Badge -->`
    );
});

describe('Class: PHPCoverageBadgeGenerator', () => {
    it('should create an instance of PHPCoverageBadgeGenerator', (): void => {
        const phpCoverageBadgeGenerator: PHPCoverageBadgeGenerator = new PHPCoverageBadgeGenerator();

        expect(phpCoverageBadgeGenerator).toBeInstanceOf(PHPCoverageBadgeGenerator);
    });

    it('should resolve with valid coverage path provided', async (): Promise<void> => {
        const phpCoverageBadgeGenerator: PHPCoverageBadgeGenerator = new PHPCoverageBadgeGenerator();

        await phpCoverageBadgeGenerator.generate(
            new CommandOption('phpunit', false, true),
            './tests/data/coverage.xml'
        ).then((data: any) => {
            expect(data).toStrictEqual('PHP Coverage Badge added to README.');
        });
    });
});