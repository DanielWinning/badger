import { LicenceGenerator } from '../src/Generators/LicenceGenerator';

describe('Class: LicenceGenerator', () => {
    it('should create an instance of LicenceGenerator', () => {
        const licenseGenerator = new LicenceGenerator();

        expect(licenseGenerator).toBeInstanceOf(LicenceGenerator);
        expect(licenseGenerator.getName()).toStrictEqual('License');
    });
});