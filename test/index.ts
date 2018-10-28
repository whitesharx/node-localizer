import * as chai from "chai";
import Locilizer from "../src/index";

describe('Tests', () => {

    const {expect} = chai;

    describe('#setLocal', () => {
        it('1', () => {
            const localizer = new Locilizer();
            const local = 'en';
            localizer.setLocal(local);
            const options = localizer.getOptions();
            expect(options.local).to.be.equal(local);
        })
    });

    describe('#setDefault', () => {
        it('1', () => {
            const localizer = new Locilizer();
            const defaultLocal = 'en';
            localizer.setDefault(defaultLocal);
            const options = localizer.getOptions();
            expect(options.default).to.be.equal(defaultLocal);
        })
    });

    describe('#get', () => {
        it('1', () => {
            const localizer = new Locilizer({
                    TEST: {
                        en: "test",
                        ru: "тест",
                        cz: "kvíz"
                    },
                    TEST2: {
                        en: "test2",
                        ru: "тест2"
                    }
                }, {default: "en", local: "ru"}
            );
            expect(localizer.get({key: "TEST"})).to.be.deep.equal( { text: 'тест', local: 'ru' });
            expect(localizer.get({key: "TEST", local: "cz"})).to.be.deep.equal({ text: 'kvíz', local: 'cz' });
            expect(localizer.get({key: "TEST2", local: "cz"})).to.be.deep.equal( { text: 'test2', local: 'en' });
        })
    });

});