import { ArgumentHandler } from './ArgumentHandler';
import { IFlag } from './Interface/IFlag';
import { JestCoverageGenerator } from './Generators/JestCoverageGenerator';
import Logger from '@dannyxcii/console-logger';
import { VersionGenerator } from './Generators/VersionGenerator';

try {
    new ArgumentHandler(process.argv);
} catch (err) {
    Logger.logError(err);
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
            Logger.logSuccess(response);
        }).catch((error) => {
            Logger.logError(error);
        });
});
