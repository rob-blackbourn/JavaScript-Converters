"use strict";

class Transformer {

    constructor(converter, targetConverter, convertTo, convertFrom) {
        this._converter = converter;
        this._targetConverter = targetConverter;
        this._convertTo = convertTo;
        this._convertFrom = convertFrom;
    }

    get converter() {
        return this._converter;
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

    transform(value, from, to, scalar) {
        if (from.domain == this._converter.domain) {
            value = from.convert(value, this._converter);
            value = this._convertTo(value, scalar);
            return this._targetConverter.convert(value, to);
        } else if (to.domain == this._converter.domain) {
            value = from.convert(value, this.targetConverter);
            value = this._convertFrom(value, scalar);
            return this._converter.convert(value, to);
        }
    }

    toString() {
        return this._converter.domain + " to " + this._targetConverter.domain;
    }
}

module.exports = Transformer;