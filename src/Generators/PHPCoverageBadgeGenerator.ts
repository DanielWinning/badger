import * as fs from 'fs';
import * as xml2js from 'xml2js';
import { BadgeGenerator } from '../BadgeGenerator';
import { CommandOption } from '../CommandOption';
import { Messages } from '../Enum/Messages';

class PHPCoverageBadgeGenerator extends BadgeGenerator
{
    getName(): string {
        return 'PHP Coverage';
    }

    public async generate(commandOption: CommandOption, arg?: string): Promise<any>
    {
        return new Promise(async (resolve, reject) => {
            await this.setupData(this.getName(), commandOption, true, arg)
                .then(async () => {
                    const coverage = this.getCoverage(arg);
                    const status = this.getStatusFromPercentageString(coverage);
                    const badge: string = this.generateHTMLBadge(coverage, status);

                    await this.updateReadmeWithBadge(badge)
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
     * @param {string} pathToXML
     *
     * @returns {string}
     *
     * @private
     */
    private getCoverage(pathToXML: string): string
    {
        const xml = fs.readFileSync(pathToXML, 'utf8');
        let coveragePercentage = 0;

        console.log('Coverage percentage:', coveragePercentage);

        xml2js.parseString(xml, (err, result) => {
            if (err) {
                throw new Error();
            }

            const coverageData = result.coverage.project[0];

            let totalMethodsAndStatements = 0,
                coveredMethodsAndStatements = 0;

            coverageData.file.forEach((file: any) => {
                if (file.class === undefined) {
                    return;
                }
                const fileMetrics = file.class[0].metrics[0].$;

                totalMethodsAndStatements += parseInt(fileMetrics.methods) + parseInt(fileMetrics.statements);
                coveredMethodsAndStatements += parseInt(fileMetrics.coveredmethods) + parseInt(fileMetrics.coveredstatements);
            });

            coveragePercentage = (coveredMethodsAndStatements / totalMethodsAndStatements) * 100;
        });

        return coveragePercentage.toFixed(2);
    }
}

export { PHPCoverageBadgeGenerator };