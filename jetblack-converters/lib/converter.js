"use strict";

var Real = require('./numbers').Real;

class Converter {

    constructor(domain, system, authority, symbol, name, targetConverter, toTarget, fromTarget) {
        this._domain = domain;
        this._system = system;
        this._authority = authority;
        this._symbol = symbol;
        this._name = name;
        this._targetConverter = targetConverter;
        this._toTarget = toTarget;
        this._fromTarget = fromTarget;
    }

    get domain() {
        return this._domain;
    }

    get system() {
        return this._system;
    }

    get authority() {
        return this._authority;
    }

    get symbol() {
        return this._symbol;
    }

    get name() {
        return this._name;
    }

    get targetConverter() {
        return this._targetConverter;
    }

    get toTarget() {
        return this._toTarget;
    }

    get fromTarget() {
        return this._fromTarget;
    }

    toString() {
        return "domain=" + this._domain + ",system=" + this._system + ",authority=" + this._authority + ",symbol=" + this._symbol + ",name=" + this._name;
    }

    convert(value, to) {

        if (!(value instanceof Real)) {
            value = new Real(value);
        }

        if (this === to) {
            return value;
        }

        var converters = Converter.prepareConverters(this, to);

        for (let converter of converters.from) {
            if (converter.toTarget) {
                value = converter.toTarget(value);
            }
        }

        for (let converter of converters.to) {
            if (converter.fromTarget) {
                value = converter.fromTarget(value);
            }
        }

        return value;
    }

    static prepareConverters(fromConverter, toConverter) {

        var fromConverters = [];
        while (fromConverter) {
            fromConverters.push(fromConverter);
            fromConverter = fromConverter.targetConverter;
        }

        var toConverters = [];
        while (toConverter) {
            var index = fromConverters.indexOf(toConverter);
            if (index != -1) {
                return { from: fromConverters.slice(0, index), to: toConverters };
            }
            toConverters.push(toConverter);
            toConverter = toConverter.targetConverter;
        }

        return null;
    }
}

module.exports = Converter;