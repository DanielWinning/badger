import { ArgumentHandler } from './ArgumentHandler';
import { IFlag } from './Interface/IFlag';

new ArgumentHandler(process.argv);

ArgumentHandler.argumentHandler.getFlags().forEach((flag: IFlag) => {
    if (flag.commandOption.hasGenerator()) {
        flag.commandOption.runGenerator(flag.value);
    }
});