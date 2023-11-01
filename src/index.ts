import { ArgumentHandler } from './ArgumentHandler';
import {BadgeGenerator} from "./BadgeGenerator";

let argumentHandler = new ArgumentHandler(process.argv);

new BadgeGenerator(argumentHandler.getFlags());