import { UnitConverter } from './UnitConverter';
import { DomainConverter } from './DomainConverter';
import type { RealInput } from './numbers/real';
import type { Real } from './numbers';

export interface ConverterCriteria {
    domain?: string;
    system?: string;
    authority?: string;
    symbol?: string;
    name?: string;
}


export class DomainConverterRepository {

    private _domainConverters: DomainConverter[];

    constructor() {
        this._domainConverters = [];
    }

    get domainConverters() {
        return this._domainConverters;
    }

    add(domainConverter: DomainConverter) {
        this._domainConverters.push(domainConverter);
        return domainConverter;
    }

    find(sourceDomain: string, targetDomain: string): DomainConverter | undefined {
        for (const domainConverter of this._domainConverters) {
            if ((sourceDomain == domainConverter.sourceConverter.domain && targetDomain == domainConverter.targetConverter.domain)
                || (sourceDomain == domainConverter.targetConverter.domain && targetDomain == domainConverter.sourceConverter.domain)) {
                return domainConverter;
            }
        }
    }
}

export class ConverterRepository {

    private _defaultClassification?: string;
    private _defaultAuthority?: string;
    private _converters: UnitConverter[];
    private _domainConverters: DomainConverterRepository;

    constructor(defaultClassification?: string, defaultAuthority?: string) {

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

    add(converter: UnitConverter) {
        this._converters.push(converter);
        return converter;
    }

    find(criteria: ConverterCriteria): UnitConverter | undefined {
        let possibles = this.findAll(criteria);

        if (possibles.length > 1) {
            const filtered = ConverterRepository.filter(possibles, this._defaultClassification, function (converter) { return converter.system; });
            if (filtered.length > 0) {
                possibles = filtered;
            }
        }

        if (possibles.length > 1) {
            const filtered = ConverterRepository.filter(possibles, this._defaultAuthority, function (converter) { return converter.authority; });
            if (filtered.length > 0) {
                possibles = filtered;
            }
        }

        return possibles[0];
    }

    findAll(criteria: ConverterCriteria) {

        let possibles = this._converters;
        possibles = ConverterRepository.filter(possibles, criteria.domain, function (converter) { return converter.domain; });
        possibles = ConverterRepository.filter(possibles, criteria.system, function (converter) { return converter.system; });
        possibles = ConverterRepository.filter(possibles, criteria.authority, function (converter) { return converter.authority; });
        possibles = ConverterRepository.filter(possibles, criteria.symbol, function (converter) { return converter.symbol; });
        possibles = ConverterRepository.filter(possibles, criteria.name, function (converter) { return converter.name; });

        return possibles;
    }

    convert(converter: UnitConverter, value: RealInput, targetConverter: UnitConverter, scalar?: Real): Real | undefined {
        if (converter.domain == targetConverter.domain) {
            return converter.convert(value, targetConverter);
        } else {
            const domainConverter = this._domainConverters.find(converter.domain, targetConverter.domain);
            if (domainConverter) {
                return domainConverter.convert(value, converter, targetConverter, scalar);
            }
        }
    }

    static filter(candidates: UnitConverter[], criterium: string | undefined, getter: (converter: UnitConverter) => string) {
        if (criterium) {
            const possibles = [];
            for (const candidate of candidates) {
                if (getter(candidate) == criterium) {
                    possibles.push(candidate);
                }
            }
            return possibles;
        } else {
            return candidates;
        }
    }

}

export const REPOSITORY = new ConverterRepository();
