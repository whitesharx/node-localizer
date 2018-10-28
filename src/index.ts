import * as appRoot from 'app-root-path';
import * as fs from 'fs';
import * as path from 'path';
import * as format from 'string-format';
import merge = require('lodash.merge');

export default class Localizer {

    private localization: ILocalization;
    private options: IOptions;

    constructor(localizationOrPath: ILocalization | string = {}, options: IOptions = {}) {
        if (!localizationOrPath) {
            return;
        }
        if (typeof(localizationOrPath) === 'string') {
            this.loadSyncLocalization(localizationOrPath);
        } else {
            this.setLocalization(localizationOrPath);
        }
        this.setOptions(options);
    }

    public setLocalization = (localization: ILocalization): Localizer => {
        this.localization = localization;
        return this;
    }

    public loadSyncLocalization = (path: string): Localizer => {
        const JSONLocalization = syncLoad(path);
        this.localization = JSON.parse(JSONLocalization);
        return this;
    }

    public loadLocalization = (path: string): Promise<Localizer> => {
        return load(path)
            .then((JSONLocalization) => {
                this.localization = JSON.parse(JSONLocalization);
                return this;
            });
    }


    public addLocalization = (localization: ILocalization): Localizer => {
        this.localization = merge(this.localization, localization);
        return this;
    }

    public setLocal = (local: string): Localizer => {
        this.options = {...this.options, local};
        return this;
    }

    public setDefault = (defaultLocal: string): Localizer => {
        this.options = {...this.options, default: defaultLocal};
        return this;
    }

    public setOptions = (options?: IOptions): Localizer => {
        const firstKey = Object.keys(this.localization)[0];
        const firstLocal = firstKey && Object.keys(this.localization[firstKey])[0];
        const local = options && options.local;
        const defaultLocal = options && options.default;
        this.options = {default: defaultLocal, local};
        return this;
    }

    public get = ({key, local, replacements = []}: { key: string, local?: string, replacements?: string[] }): { text: string, local: string } | undefined => {
        const value = this.getValue({key, local})
        if (!value) {
            return;
        }
        return {text: format(value.text, ...replacements), local: value.local};
    }

    public getOptions = (): IOptions => {
        return this.options;
    }

    private getValue = ({key, local}: { key: string, local?: string }): { text: string, local: string } | undefined => {
        if (!this.localization[key]) {
            return;
        }
        if (local) {
            const text = this.localization[key][local];
            if (text) {
                return {text, local};
            }
        }
        if (local && this.options.default) {
            const text = this.localization[key][this.options.default];
            if (text) {
                return {text, local: this.options.default};
            }
        }
        if (this.options.local) {
            const text = this.localization[key][this.options.local];
            if (text) {
                return {text, local: this.options.local};
            }
        }
        if (this.options.default) {
            const text = this.localization[key][this.options.default];
            if (text) {
                return {text, local: this.options.default};
            }
        }
        return;
    }

}


export interface ILocalization {
    [key: string]: ILocalizationItem;
}

export interface ILocalizationItem {
    [local: string]: string;
}


export interface IOptions {
    default?: string,
    local?: string,
}

function syncLoad(rout: string, encode: string = 'utf-8'): string {
    return fs.readFileSync(path.join(appRoot.path, rout), encode);
}

function load(rout: string, encode: string = 'utf-8'): Promise<string> {
    return new Promise((resolve, reject) => {
        return fs.readFile(path.join(appRoot.path, rout), encode, (err, file) => {
            if (err) {
                return reject(err);
            }
            return resolve(file);
        });
    });
}
