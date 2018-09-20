import * as chai from "chai";
import Locilizer from "../src/index";

describe('Tests', () => {

    const {expect} = chai;
    let localizer: Locilizer;

    before(() => {
        localizer = new Locilizer();
    });

    describe('#setLocal', () => {
        it('1', () => {
            const local = 'en';
            localizer.setLocal(local);
            const options = localizer.getOptions();
            expect(options.local).to.be.equal(local);
        })
    });

    describe('#setDefault', () => {
        it('1', () => {
            const defaultLocal = 'en';
            localizer.setDefault(defaultLocal);
            const options = localizer.getOptions();
            expect(options.default).to.be.equal(defaultLocal);
        })
    });

});