import { BadgeGenerator } from '../BadgeGenerator';
import { CommandOption } from '../CommandOption';
import {Messages} from "../Enum/Messages";

class VersionGenerator extends BadgeGenerator
{
    /**
     * @returns {string}
     */
    public getName(): string
    {
        return 'Version';
    }

    public async generate(commandOption: CommandOption, arg?: string): Promise<any>
    {
        return new Promise((resolve, reject) => {
            if (this.setupData(this.getName(), commandOption, false, arg)) {
                this.updateReadmeWithBadge(
                    this.generateHTMLBadge(this.data.version ?? 'N/A', 'blue')
                ).then(data => {
                    resolve(data);
                }).catch(() => {
                    reject(Messages.ERROR_READING_README);
                });
            }
        });
    }
}

export { VersionGenerator };