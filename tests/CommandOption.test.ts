import { CommandOption } from '../src/CommandOption';
import {JestCoverageGenerator} from "../src/Generators/JestCoverageGenerator";

describe('Class: Command Option', () => {
    it('should create an instance of Command Option', () => {
        const commandOption = new CommandOption('jest', new JestCoverageGenerator(), false, true);

        expect(commandOption).toBeInstanceOf(CommandOption);
    });
});