import { IFlag } from './Interface/IFlag';
import fs from 'fs';

class BadgeGenerator
{
    private flags: Array<IFlag>;
    private readonly configPath?: string;
    private readonly data: Record<string, any>;

    constructor(flags: Array<IFlag>)
    {
        this.flags = flags;

        let configFlag = this.flags.find((flag: IFlag) => flag.name === 'json');

        if (configFlag === undefined) {
            throw new Error('You must provide the --json flag with a path to the coverage JSON you wish to parse.');
        }

        this.configPath = configFlag.value;
        this.data = this.getJsonDataFromFilepath(this.configPath);

        this.run();
    }

    /**
     * @returns {Record<string, any>}
     */
    public getData(): Record<string, any>
    {
        return this.data;
    }

    private run(): void
    {
        let passedFlags = this.flatFlags();

        if (passedFlags.includes('jest')) {
            let fileCoverage = this.getJestCoveragePercentagesForFiles();
            let totalCoverage = this.getTotalJestCoverage(fileCoverage);
            let coverageStatus = this.getCoverageStatus(totalCoverage);
            let badge = this.generateHTMLBadge(totalCoverage, coverageStatus);

            this.updateReadmeWithBadge(badge);
        }
    }

    /**
     * @returns {Array<string>}
     *
     * @private
     */
    private flatFlags(): Array<string>
    {
        return this.flags.map((flag: IFlag) => flag.name);
    }

    /**
     * @returns {Array<string>}
     *
     * @private
     */
    private getJestCoveragePercentagesForFiles(): Array<string>
    {
        let coveragePercentages: Array<string> = [];

        for (const filepath in this.data) {
            let fileData = this.data[filepath];

            coveragePercentages.push(this.calculateCoverageFromJestData(fileData.s));
            coveragePercentages.push(this.calculateCoverageFromJestData(fileData.f));
        }

        return coveragePercentages;
    }

    /**
     * @param {Record<string, any>} coveragePercentages
     *
     * @returns {string}
     *
     * @private
     */
    private getTotalJestCoverage(coveragePercentages: Array<string>): string
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

    /**
     * @param {string} totalCoverage
     * @param {string} coverageStatus
     *
     * @returns {string}
     *
     * @private
     */
    private generateHTMLBadge(totalCoverage: string, coverageStatus: string): string
    {
        let badgeURL = this.generateBadgeURL(totalCoverage, coverageStatus);
        return `<img src="${badgeURL}" alt="Coverage ${totalCoverage}%">`;
    }

    /**
     * @param {string} totalCoverage
     * @param {string} coverageStatus
     *
     * @returns {string}
     *
     * @private
     */
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

            const badgeRegex = /<!-- Coverage Badge -->\n(<img[^>]*>)/;
            if (badgeRegex.test(data)) {
                const updatedReadme = data.replace(badgeRegex, `<!-- Coverage Badge -->\n${badgeHTML}`);
                this.updateReadmeFile(readmePath, updatedReadme);
            } else {
                const updatedReadme = data.replace(/(<!-- Coverage Badge -->)/, `$1\n${badgeHTML}`);
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

    /**
     * @param {Record<string, any>} data
     *
     * @returns {string}
     *
     * @private
     */
    private calculateCoverageFromJestData(data: Record<string, any>): string
    {
        let total = Object.keys(data).length,
            covered = Object.values(data).filter(count => count > 0).length;

        return ((covered / total) * 100).toFixed(2);
    }

    /**
     * @param {string} filepath
     *
     * @private
     */
    private getJsonDataFromFilepath(filepath: string): Record<string, any>
    {
        try {
            return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
        } catch (error) {
            throw new Error('Error reading the config file.');
        }
    }
}

export { BadgeGenerator };