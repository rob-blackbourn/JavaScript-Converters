"use strict";

class DomainConverterRepository {

    constructor() {
        this._domainConverters = [];
    }

    get domainConverters() {
        return this._domainConverters;
    }

    add(domainConverter) {
        this._domainConverters.push(domainConverter);
        return domainConverter;
    }

    find(sourceDomain, targetDomain) {
        for (var index = 0; index < this._domainConverters.length; ++index) {
            var domainConverter = this._domainConverters[index];
            if ((sourceDomain == domainConverter.sourceConverter.domain && targetDomain == domainConverter.targetConverter.domain)
                || (sourceDomain == domainConverter.targetConverter.domain && targetDomain == domainConverter.sourceConverter.domain)) {
                return domainConverter;
            }
        }
    }
}

class ConverterRepository {

    constructor(defaultClassification, defaultAuthority) {

        this._defaultClassification = defaultClassification;
        this._defaultAuthority = defaultAuthority;

        this._converters = [];
        this._domainConverters = new DomainConverterRepository();
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

    get domainConverters() {
        return this._domainConverters;
    }

    add(converter) {
        this._converters.push(converter);
        return converter;
    }

    find(criteria) {
        var possibles = this.findAll(criteria);

        var filtered;

        if (possibles.length > 1) {
            filtered = ConverterRepository.filter(possibles, this._defaultClassification, function (converter) { return converter.system; });
            if (filtered.length > 0) {
                possibles = filtered;
            }
        }

        if (possibles.length > 1) {
            filtered = ConverterRepository.filter(possibles, this._defaultAuthority, function (converter) { return converter.authority; });
            if (filtered.length > 0) {
                possibles = filtered;
            }
        }

        return possibles[0];
    }

    findAll(criteria) {

        var possibles = this._converters;
        possibles = ConverterRepository.filter(possibles, criteria.domain, function (converter) { return converter.domain; });
        possibles = ConverterRepository.filter(possibles, criteria.system, function (converter) { return converter.system; });
        possibles = ConverterRepository.filter(possibles, criteria.authority, function (converter) { return converter.authority; });
        possibles = ConverterRepository.filter(possibles, criteria.symbol, function (converter) { return converter.symbol; });
        possibles = ConverterRepository.filter(possibles, criteria.name, function (converter) { return converter.name; });

        return possibles;
    }

    convert(converter, value, targetConverter) {
        if (converter.domain == targetConverter.domain) {
            return converter.convert(value, targetConverter);
        } else {
            var domainConverter = this._domainConverters.find(converter.domain, targetConverter.domain);
            if (domainConverter) {
                return domainConverter.convert(value, converter, targetConverter);
            }
        }
    }

    static filter(candidates, criterium, getter) {
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
    }

}

module.exports = new ConverterRepository();