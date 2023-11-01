import { BadgeGenerator } from '../BadgeGenerator';
import { CommandOption } from '../CommandOption';
import * as fs from 'fs';

class JestCoverageGenerator extends BadgeGenerator
{
    public generate(commandOption: CommandOption, arg?: string)
    {
        super.generate(commandOption, arg);

        const filePercentages: Array<string> = this.getFileCoveragePercentages();
        const totalCoveragePercentage: string = this.getTotalCoverage(filePercentages);
        const coverageStatus: string = this.getCoverageStatus(totalCoveragePercentage);
        const badge: string = this.generateHTMLBadge(totalCoveragePercentage, coverageStatus);

        this.updateReadmeWithBadge(badge);
    }

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
     * @private
     */
    private calculateCoverageMetric(data: Record<string, any>): string
    {
        let total = Object.keys(data).length,
            covered = Object.values(data).filter(count => count > 0).length;

        return ((covered / total) * 100).toFixed(2);
    }

    private getTotalCoverage(coveragePercentages: Array<string>): string
    {
        let count = coveragePercentages.length,
            sum = coveragePercentages.reduce((runningTotal: string, percentage: string) => {
                return (Number(runningTotal) + Number(percentage)).toString();
            });

        return (Number(sum) / count).toFixed(2);
    }

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

    private generateHTMLBadge(totalCoverage: string, coverageStatus: string): string
    {
        let badgeURL = this.generateBadgeURL(totalCoverage, coverageStatus);
        return `<img src="${badgeURL}" alt="Coverage ${totalCoverage}%">`;
    }

    private generateBadgeURL(totalCoverage: string, coverageStatus: string): string
    {
        return `https://img.shields.io/badge/Coverage-${totalCoverage}%25-${coverageStatus}.svg`;
    }

    private updateReadmeWithBadge(badgeHTML: string)
    {
        const readmePath = './README.md';

        fs.readFile(readmePath, 'utf8', (err, data) => {
            if (err) {
                console.error(`Error reading file ${err}`);
                return;
            }

            const badgeRegex = /<!-- Coverage Badge -->\s*<img [^>]*>/;

            if (badgeRegex.test(data)) {
                const updatedReadme = data.replace(
                    badgeRegex,
                    `<!-- Coverage Badge -->\n${badgeHTML}`
                );
                this.updateReadmeFile(readmePath, updatedReadme);
            } else {
                const updatedReadme = data.replace(
                    '<!-- Coverage Badge -->',
                    `<!-- Coverage Badge -->\n${badgeHTML}`
                );
                this.updateReadmeFile(readmePath, updatedReadme);
            }
        });
    }

    /**
     * @param {string} readmePath
     * @param {string} updatedReadme
     *
     * @returns {void}
     *
     * @private
     */
    private updateReadmeFile(readmePath: string, updatedReadme: string): void
    {
        fs.writeFile(readmePath, updatedReadme, 'utf8', (err) => {
            if (err) {
                console.error(`Error writing to README file: ${err}`);
            } else {
                console.log('Badge added to README');
            }
        });
    }
}

export { JestCoverageGenerator };