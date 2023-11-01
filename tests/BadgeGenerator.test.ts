import { BadgeGenerator } from '../src/BadgeGenerator';
import { CommandOption } from '../src/CommandOption';
import * as fs from "fs";

describe('Class: BadgeGenerator', () => {
    it('should create an instance of BadgeGenerator', () => {
        const badgeGenerator = new BadgeGenerator([
            {
                name: 'json',
                value: './coverage/coverage-final.json',
                commandOption: new CommandOption('json', true, true)
            }
        ]);

        expect(badgeGenerator).toBeInstanceOf(BadgeGenerator);
    });

    it('should throw an error when not provided with required parameters', () => {
        expect(() => {
            new BadgeGenerator([
                {
                    name: 'jest',
                    value: null,
                    commandOption: new CommandOption('jest', false, false)
                }
            ]);
        }).toThrowError();
    });

    it('sets data when given correct filepath', () => {
        let badgeGenerator = new BadgeGenerator([
            {
                name: 'json',
                value: './tests/data/jest-coverage.json',
                commandOption: new CommandOption('json', true, true)
            }
        ]);

        let data = JSON.parse(fs.readFileSync('./tests/data/jest-coverage.json', 'utf-8'));

        expect(badgeGenerator.getData()).toStrictEqual(data);
    });
});