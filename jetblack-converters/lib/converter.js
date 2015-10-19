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

        var toConverters = [];
        var toConverter = to;
        while (toConverter.fromTarget) {
            toConverters.push(toConverter);
            toConverter = toConverter.targetConverter;
        }

        var from = this;
        while (from.toTarget) {

            if (from == to) {
                return value;
            }

            value = from.toTarget(value);

            var index = toConverters.indexOf(from);

            if (index == -1) {
                from = from.targetConverter;
            } else {
                for (; index >= 0; --index) {
                    value = toConverters[index].fromTarget(value);
                }
                return value;
            }
        }

        while (toConverters.length > 0) {
            value = toConverters.pop().fromTarget(value);
        }

        return value;
    }
}

module.exports = Converter;