import { ArgumentHandler } from './ArgumentHandler';
import { IFlag } from './Interface/IFlag';
import { JestCoverageGenerator } from './Generators/JestCoverageGenerator';
import { VersionGenerator } from './Generators/VersionGenerator';
import { ConsoleLogger } from '@dannyxcii/console-logger';
import {LicenceGenerator} from "./Generators/LicenceGenerator";

try {
    new ArgumentHandler(process.argv);
} catch (err) {
    ConsoleLogger.logError(err);
    process.exit();
}

const badgeGenerators = {
    jest: new JestCoverageGenerator(),
    version: new VersionGenerator(),
    license: new LicenceGenerator()
};

ArgumentHandler.argumentHandler.getFlags().forEach(async (flag: IFlag) => {
    const generator = badgeGenerators[flag.name as keyof typeof badgeGenerators];

    if (!generator) {
        return;
    }

    await generator.generate(flag.commandOption, flag.value)
        .then(response => {
            ConsoleLogger.logSuccess(response);
        }).catch((error) => {
            ConsoleLogger.logError(error);
        });
});
