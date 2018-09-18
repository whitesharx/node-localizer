"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var appRoot = require("app-root-path");
var fs = require("fs");
var merge = require("merge");
var path = require("path");
var format = require("string-format");
var Localizer = /** @class */ (function () {
    function Localizer(localizationOrPath, options) {
        var _this = this;
        this.setLocalization = function (localization) {
            _this.localization = localization;
            return _this;
        };
        this.addLocalization = function (localization) {
            _this.localization = merge(_this.localization, localization);
            return _this;
        };
        this.setLocal = function (local) {
            _this.options = __assign({}, _this.options, { local: local });
            return _this;
        };
        this.setDefault = function (defaultLocal) {
            _this.options = __assign({}, _this.options, { default: defaultLocal });
            return _this;
        };
        this.get = function (_a) {
            var key = _a.key, local = _a.local, _b = _a.replacements, replacements = _b === void 0 ? [] : _b;
            return format.apply(void 0, [_this.getValue({ key: key, local: local })].concat(replacements));
        };
        this.getValue = function (_a) {
            var key = _a.key, local = _a.local;
            if (!_this.localization[key]) {
                throw new Error('Localization was\'t found!');
            }
            if (local) {
                var value1 = _this.localization[key][local];
                if (value1) {
                    return value1;
                }
            }
            var value2 = _this.localization[key][_this.options.local];
            if (value2) {
                return value2;
            }
            var value3 = _this.localization[key][_this.options.default];
            if (value3) {
                return value3;
            }
            throw new Error('Localization was\'t found!');
        };
        if (!localizationOrPath) {
            return;
        }
        if (typeof (localizationOrPath) === 'string') {
            var path_1 = localizationOrPath;
            var JSONLocalization = syncLoad(path_1);
            this.localization = JSON.parse(JSONLocalization);
        }
        else {
            this.localization = localizationOrPath;
        }
        var firstKey = Object.keys(this.localization)[0];
        var firstLocal = firstKey && Object.keys(this.localization[firstKey])[0];
        var local = options && options.local || firstLocal || 'en';
        var defaultLocal = options && options.default || firstLocal || 'en';
        this.options = { default: defaultLocal, local: local };
    }
    return Localizer;
}());
exports.default = Localizer;
function syncLoad(rout, encode) {
    if (encode === void 0) { encode = 'utf-8'; }
    return fs.readFileSync(path.join(appRoot.path, rout), encode);
}
function load(rout, encode) {
    if (encode === void 0) { encode = 'utf-8'; }
    return new Promise(function (resolve, reject) {
        return fs.readFile(path.join(appRoot.path, rout), encode, function (err, file) {
            if (err) {
                return reject(err);
            }
            return resolve(file);
        });
    });
}
