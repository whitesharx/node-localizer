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
            expect(options.locale).to.be.equal(local);
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
                    },
                    TEST3: {
                        en: "test{0}",
                        ru: "тест{0}"
                    }
                }, {default: "en", locale: "ru"}
            );
            expect(localizer.get({key: "TEST"})).to.be.deep.equal( { text: 'тест', locale: 'ru' });
            expect(localizer.get({key: "TEST", locale: "cz"})).to.be.deep.equal({text: 'kvíz', locale: 'cz'});
            expect(localizer.get({key: "TEST2", locale: "cz"})).to.be.deep.equal({text: 'test2', locale: 'en'});
            expect(localizer.get({key: "TEST3", locale: "ru", replacements: ["3"]})).to.be.deep.equal({text: 'тест3', locale: 'ru'});
        })
    });

});