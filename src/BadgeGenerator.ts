import * as fs from 'fs';
import { CommandOption } from './CommandOption';
import { IBadgeGenerator } from './Interface/IBadgeGenerator';
import { ArgumentHandler } from './ArgumentHandler';

abstract class BadgeGenerator implements IBadgeGenerator
{
    name: string;
    commandOption: CommandOption;
    configPath?: string;
    data?: Record<string, any>;
    isPercentage: boolean;

    /**
     * @param {string} name
     * @param {CommandOption} commandOption
     * @param {boolean} isPercentage
     * @param {string?} arg
     *
     * @returns {boolean}
     *
     * @private
     */
    protected setupData(name: string, commandOption: CommandOption, isPercentage: boolean = false, arg?: string): boolean
    {
        this.commandOption = commandOption;

        if (this.commandOption.requiresValue() && !arg) {
            return false;
        }

        this.configPath = arg;
        this.data = this.getJsonDataFromFilepath(this.configPath);
        this.name = name;
        this.isPercentage = isPercentage;

        return true;
    }

    /**
     * @param {CommandOption} commandOption
     * @param {string?} arg
     */
    abstract generate(commandOption: CommandOption, arg?: string): void;

    /**
     * @returns {string}
     */
    abstract getName(): string;

    /**
     * @param {string} value
     * @param {string} color
     *
     * @returns {string}
     *
     * @protected
     */
    protected generateBadgeURL(value: string, color: string): string
    {
        return `https://img.shields.io/badge/${this.name}-${value}${this.isPercentage ? '%25' : ''}-${color}`;
    }

    /**
     * @param {string} value
     * @param {string} color
     *
     * @returns {string}
     *
     * @protected
     */
    protected generateHTMLBadge(value: string, color: string): string
    {
        let badgeURL = this.generateBadgeURL(value, color);

        return `<img src="${badgeURL}" alt="${this.name} ${value}${this.isPercentage ? '%' : ''}">`;
    }

    /**
     * @param {string} filepath
     *
     * @returns {Record<string, any>}
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

    /**
     * @param {string} badgeHTML
     *
     * @protected
     */
    public async updateReadmeWithBadge(badgeHTML: string): Promise<any>
    {
        return new Promise((resolve, reject) => {
            const readmePath = ArgumentHandler.argumentHandler?.readmePath !== undefined
                ? ArgumentHandler.argumentHandler.readmePath
                : './README.md';

            fs.readFile(readmePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    const badgeRegex = new RegExp(`<!-- ${this.name} Badge -->\\s*<img [^>]*>`);

                    if (badgeRegex.test(data)) {
                        const updatedReadme = data.replace(
                            badgeRegex,
                            `<!-- ${this.name} Badge -->\n${badgeHTML}`
                        );
                        this.updateReadmeFile(readmePath, updatedReadme);
                        resolve(`${this.name} Badge added to README.`);
                    } else {
                        const updatedReadme = data.replace(
                            `<!-- ${this.name} Badge -->`,
                            `<!-- ${this.name} Badge -->\n${badgeHTML}`
                        );
                        this.updateReadmeFile(readmePath, updatedReadme);
                        resolve(`${this.name} Badge added to README.`);
                    }
                }
            });
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
                throw new Error(`Error writing to README file: ${err}`);
            }
        });
    }
}

export { BadgeGenerator };