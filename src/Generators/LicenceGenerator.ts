import { BadgeGenerator } from '../BadgeGenerator';
import { CommandOption } from '../CommandOption';
import { Messages } from '../Enum/Messages';

class LicenceGenerator extends BadgeGenerator
{
    /**
     * @param {CommandOption} commandOption
     * @param {?string} arg
     *
     * @returns {Promise<any>}
     */
    public async generate(commandOption: CommandOption, arg?: string): Promise<any>
    {
        return new Promise(async (resolve, reject) => {
            await this.setupData(this.getName(), commandOption, false, arg)
                .then(async () => {
                    const license = this.data.license
                        ? this.data.license.replace(new RegExp('-', 'g'), '--')
                        : 'N/A';

                    await this.updateReadmeWithBadge(
                        this.generateHTMLBadge(license, '34ad9b')
                    ).then(data => {
                        resolve(data);
                    }).catch(() => {
                        reject(Messages.ERROR_READING_README);
                    });
                }).catch(err => reject(err));
        });
    }

    getName(): string {
        return 'License';
    }
}

export { LicenceGenerator };