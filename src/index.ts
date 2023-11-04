import { ArgumentHandler } from './ArgumentHandler';
import { ConsoleColor } from './Enum/ConsoleColor';
import { IFlag } from './Interface/IFlag';
import { JestCoverageGenerator } from './Generators/JestCoverageGenerator';
import { VersionGenerator } from './Generators/VersionGenerator';

try {
    new ArgumentHandler(process.argv);
} catch (err) {
    console.error(`${ConsoleColor.FgRed}${err}${ConsoleColor.Reset}`);
    process.exit();
}

const badgeGenerators = {
    jest: new JestCoverageGenerator(),
    version: new VersionGenerator(),
};

ArgumentHandler.argumentHandler.getFlags().forEach(async (flag: IFlag) => {
    const generator = badgeGenerators[flag.name as keyof typeof badgeGenerators];

    if (!generator) {
        return;
    }

    await generator.generate(flag.commandOption, flag.value)
        .then(response => {
            console.log(`${ConsoleColor.FgGreen}${response}${ConsoleColor.Reset}`);
        }).catch((error) => {
            console.error(`${ConsoleColor.FgRed}${error}${ConsoleColor.Reset}`);
        });
});
