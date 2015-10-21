"use strict";

class DomainConverter {

    constructor(sourceConverter, targetConverter, convertTo, convertFrom) {
        this._sourceConverter = sourceConverter;
        this._targetConverter = targetConverter;
        this._convertTo = convertTo;
        this._convertFrom = convertFrom;
    }

    get sourceConverter() {
        return this._sourceConverter;
    }

    get targetConverter() {
        return this._targetConverter;
    }

    get convertTo() {
        return this._convertTo;
    }

    get convertFrom() {
        return this._convertFrom;
    }

    convert(value, from, to, scalar) {
        if (from.domain == this._sourceConverter.domain) {
            value = from.convert(value, this._sourceConverter);
            value = this._convertTo(value, scalar);
            return this._targetConverter.convert(value, to);
        } else if (to.domain == this._sourceConverter.domain) {
            value = from.convert(value, this.targetConverter);
            value = this._convertFrom(value, scalar);
            return this._sourceConverter.convert(value, to);
        }
    }

    toString() {
        return this._sourceConverter.domain + " to " + this._targetConverter.domain;
    }
}

module.exports = DomainConverter;