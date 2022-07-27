"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appRoot = require("app-root-path");
const fs = require("fs");
const path = require("path");
const format = require("string-format");
const merge = require("lodash.merge");
class Localizer {
    constructor(localizationOrPath = {}, options = {}) {
        this.setLocalization = (localization) => {
            this.localization = localization;
            return this;
        };
        this.loadSyncLocalization = (path) => {
            const JSONLocalization = syncLoad(path);
            this.localization = JSON.parse(JSONLocalization);
            return this;
        };
        this.loadLocalization = (path) => {
            return load(path)
                .then((JSONLocalization) => {
                this.localization = JSON.parse(JSONLocalization);
                return this;
            });
        };
        this.addLocalization = (localization) => {
            this.localization = merge(this.localization, localization);
            return this;
        };
        this.setLocal = (local) => {
            this.options = Object.assign({}, this.options, { local });
            return this;
        };
        this.setDefault = (defaultLocal) => {
            this.options = Object.assign({}, this.options, { default: defaultLocal });
            return this;
        };
        this.setOptions = (options) => {
            const firstKey = Object.keys(this.localization)[0];
            const firstLocal = firstKey && Object.keys(this.localization[firstKey])[0];
            const local = options && options.local;
            const defaultLocal = options && options.default;
            this.options = { default: defaultLocal, local };
            return this;
        };
        this.get = ({ key, local, replacements = [] }) => {
            return format(this.getValue({ key, local }), ...replacements);
        };
        this.getOptions = () => {
            return this.options;
        };
        this.getValue = ({ key, local }) => {
            if (!this.localization[key]) {
                throw new Error('Localization was\'t found!');
            }
            if (local) {
                const value1 = this.localization[key][local];
                if (value1) {
                    return value1;
                }
            }
            if (this.options.local) {
                const value2 = this.localization[key][this.options.local];
                if (value2) {
                    return value2;
                }
            }
            if (!this.options.default) {
                throw new Error('Localization was\'t found!');
            }
            const value3 = this.localization[key][this.options.default];
            if (value3) {
                return value3;
            }
            throw new Error('Localization was\'t found!');
        };
        if (!localizationOrPath) {
            return;
        }
        if (typeof (localizationOrPath) === 'string') {
            this.loadSyncLocalization(localizationOrPath);
        }
        else {
            this.setLocalization(localizationOrPath);
        }
        this.setOptions(options);
    }
}
exports.default = Localizer;
function syncLoad(rout, encode = 'utf-8') {
    return fs.readFileSync(path.join(appRoot.path, rout), encode);
}
function load(rout, encode = 'utf-8') {
    return new Promise((resolve, reject) => {
        return fs.readFile(path.join(appRoot.path, rout), encode, (err, file) => {
            if (err) {
                return reject(err);
            }
            return resolve(file);
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5Q0FBeUM7QUFDekMseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUM3Qix3Q0FBd0M7QUFDeEMsc0NBQXVDO0FBRXZDLE1BQXFCLFNBQVM7SUFLMUIsWUFBWSxxQkFBNkMsRUFBRSxFQUFFLFVBQW9CLEVBQUU7UUFZNUUsb0JBQWUsR0FBRyxDQUFDLFlBQTJCLEVBQWEsRUFBRTtZQUNoRSxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztZQUNqQyxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDLENBQUE7UUFFTSx5QkFBb0IsR0FBRyxDQUFDLElBQVksRUFBYSxFQUFFO1lBQ3RELE1BQU0sZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ2pELE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUMsQ0FBQTtRQUVNLHFCQUFnQixHQUFHLENBQUMsSUFBWSxFQUFzQixFQUFFO1lBQzNELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztpQkFDWixJQUFJLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFO2dCQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDakQsT0FBTyxJQUFJLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDLENBQUE7UUFHTSxvQkFBZSxHQUFHLENBQUMsWUFBMkIsRUFBYSxFQUFFO1lBQ2hFLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDM0QsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQyxDQUFBO1FBRU0sYUFB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