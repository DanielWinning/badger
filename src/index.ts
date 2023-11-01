import { ArgumentHandler } from './ArgumentHandler';

let argumentHandler = new ArgumentHandler(process.argv);

console.log(argumentHandler.getFlags());