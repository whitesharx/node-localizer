import * as appRoot from 'app-root-path';
import * as fs from 'fs';
import * as path from 'path';
import * as format from 'string-format';
import merge = require('lodash.merge');

export default class Localizer {

    private localization: ILocalization;
    private options: IOptions;

    constructor(localizationOrPath?: ILocalization | string, options?: IArgOptions) {
        this.setOptions(options);
        if (!localizationOrPath) {
            return;
        }
        if (typeof(localizationOrPath) === 'string') {
            this.loadSyncLocalization(localizationOrPath);
        } else {
            this.setLocalization(localizationOrPath);
        }
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
            .then((JSONLocalization)=>{
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

    public setOptions = (options?: IArgOptions): Localizer => {
        const firstKey = Object.keys(this.localization)[0];
        const firstLocal = firstKey && Object.keys(this.localization[firstKey])[0];
        const local = options && options.local || firstLocal || 'en';
        const defaultLocal = options && options.default || firstLocal || 'en';
        const memoizeLoad = options && options.memoizeLoad || false;
        this.options = {default: defaultLocal, local, memoizeLoad};
        return this;
    }

    public get = ({key, local, replacements = []}: { key: string, local?: string, replacements?: string[] }): string => {
        return format(this.getValue({key, local}), ...replacements);
    }

    private getValue = ({key, local}: { key: string, local?: string }): string => {
        if (!this.localization[key]) {
            throw new Error('Localization was\'t found!')
        }
        if (local) {
            const value1 = this.localization[key][local];
            if (value1) {
                return value1;
            }
        }
        const value2 = this.localization[key][this.options.local];
        if (value2) {
            return value2;
        }
        const value3 = this.localization[key][this.options.default];
        if (value3) {
            return value3;
        }
        throw new Error('Localization was\'t found!');
    }

}


export interface ILocalization {
    [key: string]: ILocalizationItem;
}

export interface ILocalizationItem {
    [local: string]: string;
}

export interface IArgOptions {
    default?: string,
    local?: string,
    memoizeLoad?: boolean;
}

export interface IOptions extends IArgOptions{
    default: string,
    local: string,
    memoizeLoad: boolean,
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
