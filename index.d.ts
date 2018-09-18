export default class Localizer {
    constructor(localizationOrPath?: ILocalization | string, options?: IArgOptions);

    setLocalization(localization: ILocalization): Localizer;

    loadSyncLocalization(path: string): Localizer;

    loadLocalization(path: string): Promise<Localizer>;

    addLocalization(localization: ILocalization): Localizer;

    setLocal(local: string): Localizer;

    setDefault(defaultLocal: string): Localizer;

    setOptions(options?: IArgOptions): Localizer;

    get({key, local, replacements}: { key: string, local?: string, replacements?: string[] }): string;

}

interface ILocalization {
    [key: string]: ILocalizationItem;
}

interface ILocalizationItem {
    [local: string]: string;
}
interface IArgOptions {
    default?: string,
    local?: string,
    memoizeLoad?: boolean;
}

interface IOptions extends IArgOptions {
    default: string,
    local: string,
    memoizeLoad: boolean,
}