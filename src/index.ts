import { ArgumentHandler } from './ArgumentHandler';
import { IFlag } from './Interface/IFlag';

let argumentHandler = new ArgumentHandler(process.argv);

argumentHandler.getFlags().forEach((flag: IFlag) => {
    flag.commandOption.runGenerator(flag.value);
})