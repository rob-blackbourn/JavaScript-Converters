"use strict";

class TransformerRepository {

    constructor() {
        this._transformers = [];
    }

    get transformers() {
        return this._transformers;
    }

    add(transformer) {
        this._transformers.push(transformer);
        return transformer;
    }

    find(domain, targetDomain) {
        for (var index = 0; index < this._transformers.length; ++index) {
            var transformer = this._transformers[index];
            if ((domain == transformer.converter.domain && targetDomain == transformer.targetConverter.domain)
                || (domain == transformer.targetConverter.domain && targetDomain == transformer.converter.domain)) {
                return transformer;
            }
        }
    }
}

var filter = function (candidates, criterium, getter) {
    if (criterium) {
        var possibles = [];
        for (var i = 0; i < candidates.length; ++i) {
            if (getter(candidates[i]) == criterium) {
                possibles.push(candidates[i]);
            }
        }
        return possibles;
    } else {
        return candidates;
    }
};

class ConverterRepository {

    constructor(defaultClassification, defaultAuthority) {

        this._defaultClassification = defaultClassification;
        this._defaultAuthority = defaultAuthority;

        this._converters = [];
        this._transformers = new TransformerRepository();
    }

    get defaultClassification() {
        return this._defaultClassification;
    }

    get defaultAuthority() {
        return this._defaultAuthority;
    }

    get converters() {
        return this._converters;
    }

    get transformers() {
        return this._transformers;
    }

    add(converter) {
        this._converters.push(converter);
        return converter;
    }

    find(criteria) {
        var possibles = this.findAll(criteria);

        var filtered;

        if (possibles.length > 1) {
            filtered = filter(possibles, this._defaultClassification, function (converter) { return converter.system; });
            if (filtered.length > 0) {
                possibles = filtered;
            }
        }

        if (possibles.length > 1) {
            filtered = filter(possibles, this._defaultAuthority, function (converter) { return converter.authority; });
            if (filtered.length > 0) {
                possibles = filtered;
            }
        }

        return possibles[0];
    }

    findAll(criteria) {

        var possibles = this._converters;
        possibles = filter(possibles, criteria.domain, function (converter) { return converter.domain; });
        possibles = filter(possibles, criteria.system, function (converter) { return converter.system; });
        possibles = filter(possibles, criteria.authority, function (converter) { return converter.authority; });
        possibles = filter(possibles, criteria.symbol, function (converter) { return converter.symbol; });
        possibles = filter(possibles, criteria.name, function (converter) { return converter.name; });

        return possibles;
    }

    convert(converter, value, targetConverter) {
        if (converter.domain == targetConverter.domain) {
            return converter.convert(value, targetConverter);
        } else {
            var transformer = this._transformers.find(converter.domain, targetConverter.domain);
            if (transformer) {
                return transformer.transform(value, converter, targetConverter);
            }
        }
    }
}

module.exports = new ConverterRepository();