import { BadgeGenerator } from '../BadgeGenerator';
import { CommandOption } from '../CommandOption';

class VersionGenerator extends BadgeGenerator
{
    /**
     * @returns {string}
     */
    public getName(): string
    {
        return 'Version';
    }

    generate(commandOption: CommandOption, arg?: string): void
    {
        this.setupData(this.getName(), commandOption, false, arg);

        this.updateReadmeWithBadge(
            this.generateHTMLBadge(this.data.version ?? 'N/A', 'blue')
        );
    }
}

export { VersionGenerator };