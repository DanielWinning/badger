import * as fs from 'fs';
import * as xml2js from 'xml2js';
import { BadgeGenerator } from '../BadgeGenerator';
import { CommandOption } from '../CommandOption';
import { Messages } from '../Enum/Messages';
import {parse} from 'ts-jest';

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
                    console.log(coverage);
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

        xml2js.parseString(xml, (err, result) => {
            if (err) {
                throw new Error();
            }

            const coverageData = result.coverage.project[0];
            let totalElements = 0,
                coveredElements = 0;

            const processFile = (file: any) => {
                let fileMetrics = null;

                if (file.class && file.class[0]) {
                    fileMetrics = file.class[0].metrics[0].$;
                } else if (file.metrics && file.metrics[0]) {
                    fileMetrics = file.metrics[0].$;
                }

                if (fileMetrics) {
                    totalElements += parseInt(fileMetrics.methods)
                        + parseInt(fileMetrics.statements)
                        + parseInt(fileMetrics.conditionals)
                        + parseInt(fileMetrics.elements);
                    coveredElements += parseInt(fileMetrics.coveredmethods)
                        + parseInt(fileMetrics.coveredstatements)
                        + parseInt(fileMetrics.coveredconditionals)
                        + parseInt(fileMetrics.coveredelements);
                }
            };

            if (coverageData.file) {
                coverageData.file.forEach(processFile);
            }

            if (coverageData.package) {
                coverageData.package.forEach((pkg: any) => {
                    if (pkg.file) {
                        pkg.file.forEach(processFile);
                    }
                });
            }

            if (totalElements > 0) {
                coveragePercentage = (coveredElements / totalElements) * 100;
            } else {
                coveragePercentage = 0;
            }
        });

        return coveragePercentage.toFixed(2);
    }
}

export { PHPCoverageBadgeGenerator };