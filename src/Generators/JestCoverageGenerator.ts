import { BadgeGenerator } from '../BadgeGenerator';
import { CommandOption } from '../CommandOption';
import { Messages } from '../Enum/Messages';

class JestCoverageGenerator extends BadgeGenerator
{
    public getName()
    {
        return 'JS Coverage';
    }

    /**
     * @param {CommandOption} commandOption
     * @param {string?} arg
     *
     * @returns {Promise<any>}
     */
    public async generate(commandOption: CommandOption, arg?: string): Promise<any>
    {
        return new Promise(async (resolve, reject) => {
            await this.setupData(this.getName(), commandOption, true, arg)
                .then(() => {
                    const filePercentages: Array<string> = this.getFileCoveragePercentages();
                    const totalCoveragePercentage: string = this.getTotalCoverage(filePercentages);
                    const coverageStatus: string = this.getStatusFromPercentageString(totalCoveragePercentage);
                    const badge: string = this.generateHTMLBadge(totalCoveragePercentage, coverageStatus);

                    this.updateReadmeWithBadge(badge)
                        .then(data => {
                            resolve(data);
                        })
                        .catch(() => {
                            reject(`Error: ${Messages.ERROR_READING_README}`);
                        });
                })
                .catch(err => reject(err));
        });
    }

    /**
     * @returns {Array<string>}
     *
     * @private
     */
    private getFileCoveragePercentages(): Array<string>
    {
        let coveragePercentages: Array<string> = [];

        for (const filepath in this.data) {
            let fileData = this.data[filepath];

            coveragePercentages.push(this.calculateCoverageMetric(fileData.s));
            coveragePercentages.push(this.calculateCoverageMetric(fileData.f));
        }

        return coveragePercentages;
    }

    /**
     * @param {Record<string, any>} data
     *
     * @returns {string}
     *
     * @private
     */
    private calculateCoverageMetric(data: Record<string, any>): string
    {
        let total = Object.keys(data).length,
            covered = Object.values(data).filter(count => count > 0).length;

        return ((covered / total) * 100).toFixed(2);
    }

    /**
     * @param {Array<string>} coveragePercentages
     *
     * @returns {string}
     *
     * @private
     */
    private getTotalCoverage(coveragePercentages: Array<string>): string
    {
        let count = coveragePercentages.length,
            sum = coveragePercentages.reduce((runningTotal: string, percentage: string) => {
                return (Number(runningTotal) + Number(percentage)).toString();
            });

        return (Number(sum) / count).toFixed(2);
    }
}

export { JestCoverageGenerator };