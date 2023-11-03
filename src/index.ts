import { ArgumentHandler } from './ArgumentHandler';
import { IFlag } from './Interface/IFlag';
import {CommandOption} from "./CommandOption";
import {JestCoverageGenerator} from "./Generators/JestCoverageGenerator";
import {VersionGenerator} from "./Generators/VersionGenerator";

new ArgumentHandler(process.argv);

const commandOptions: Array<CommandOption> = [
    new CommandOption('jest', false, true),
    new CommandOption('readme', false, true),
    new CommandOption('version', false, true),
];
const badgeGenerators = {
    jest: new JestCoverageGenerator(),
    version: new VersionGenerator(),
};

ArgumentHandler.argumentHandler.getFlags().forEach((flag: IFlag) => {
    const generator = badgeGenerators[flag.name as keyof typeof badgeGenerators];

    if (!generator) {
        return;
    }

    generator.generate(flag.commandOption, flag.value);
});
