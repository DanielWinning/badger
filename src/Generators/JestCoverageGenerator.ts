import { BadgeGenerator } from '../BadgeGenerator';
import { CommandOption } from '../CommandOption';

class JestCoverageGenerator extends BadgeGenerator
{
    /**
     * @param {CommandOption} commandOption
     * @param {string?} arg
     */
    public generate(commandOption: CommandOption, arg?: string): void
    {
        this.setupData('Coverage', commandOption, true, arg);

        const filePercentages: Array<string> = this.getFileCoveragePercentages();
        const totalCoveragePercentage: string = this.getTotalCoverage(filePercentages);
        const coverageStatus: string = this.getCoverageStatus(totalCoveragePercentage);
        const badge: string = this.generateHTMLBadge(totalCoveragePercentage, coverageStatus);

        this.updateReadmeWithBadge(badge);
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

    /**
     * @param {string} totalPercentage
     *
     * @returns {string}
     *
     * @private
     */
    private getCoverageStatus(totalPercentage: string): string
    {
        const coverage = parseFloat(totalPercentage);

        if (coverage >= 90) {
            return 'green';
        } else if (coverage >= 80) {
            return 'yellow';
        } else {
            return 'red';
        }
    }
}

export { JestCoverageGenerator };