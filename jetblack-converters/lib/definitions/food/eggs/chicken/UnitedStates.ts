import type { ConverterRepository } from '../../../../index';
import { Fraction, Real, UnitConverter } from '../../../../index';

export default function (repository: ConverterRepository) {
    const domain = 'mass'
    const authority = 'US';

    const ounceConverter = repository.find({ authority: authority, system: 'customary', name: 'ounce' });

    const jumboScalar = new Real(new Fraction(5, 2));
    repository.add(new UnitConverter(domain, "food/chicken/eggs", authority, "jumbo", "jumbo", ounceConverter,
        function (value) {
            return value.mul(jumboScalar);
        }, function (value) {
            return value.div(jumboScalar);
        }));

    const veryLargeScalar = new Real(new Fraction(9, 4));
    repository.add(new UnitConverter(domain, "food/chicken/eggs", authority, "XL", "very large", ounceConverter,
        function (value) {
            return value.mul(veryLargeScalar);
        }, function (value) {
            return value.div(veryLargeScalar);
        }));

    const largeScalar = new Real(2);
    repository.add(new UnitConverter(domain, "food/chicken/eggs", authority, "L", "large", ounceConverter,
        function (value) {
            return value.mul(largeScalar);
        }, function (value) {
            return value.div(largeScalar);
        }));

    const mediumScalar = new Real(new Fraction(7, 4));
    repository.add(new UnitConverter(domain, "food/chicken/eggs", authority, "M", "medium", ounceConverter,
        function (value) {
            return value.mul(mediumScalar);
        }, function (value) {
            return value.div(mediumScalar);
        }));

    const smallScalar = new Real(new Fraction(3, 2));
    repository.add(new UnitConverter(domain, "food/chicken/eggs", authority, "S", "small", ounceConverter,
        function (value) {
            return value.mul(smallScalar);
        }, function (value) {
            return value.div(smallScalar);
        }));

    const peeweeScalar = new Real(new Fraction(5, 4));
    repository.add(new UnitConverter(domain, "food/chicken/eggs", authority, "peewee", "peewee", ounceConverter,
        function (value) {
            return value.mul(peeweeScalar);
        }, function (value) {
            return value.div(peeweeScalar);
        }));
};