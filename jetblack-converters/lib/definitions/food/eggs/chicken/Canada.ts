import type { ConverterRepository } from '../../../../index';
import { Real, UnitConverter } from '../../../../index';

export default function (repository: ConverterRepository) {

    const domain = 'mass';
    const system = "food/chicken/eggs";
    const authority = "CA";

    const grammeConverter = repository.find({ authority: 'si', system: 'metric', name: 'gramme' });

    const jumboScalar = new Real(70);

    repository.add(new UnitConverter(domain, system, authority, "jumbo", "jumbo", grammeConverter,
        function (value) {
            return value.mul(jumboScalar);
        }, function (value) {
            return value.div(jumboScalar);
        }));

    const veryLargeScalar = new Real(66);
    repository.add(new UnitConverter(domain, system, authority, "XL", "very large", grammeConverter,
        function (value) {
            return value.mul(veryLargeScalar);
        }, function (value) {
            return value.div(veryLargeScalar);
        }));

    const largeScalar = new Real(59);
    repository.add(new UnitConverter(domain, system, authority, "L", "large", grammeConverter,
        function (value) {
            return value.mul(largeScalar);
        }, function (value) {
            return value.div(largeScalar);
        }));

    const mediumScalar = new Real(52);
    repository.add(new UnitConverter(domain, system, authority, "M", "medium", grammeConverter,
        function (value) {
            return value.mul(mediumScalar);
        }, function (value) {
            return value.div(mediumScalar);
        }));

    const smallScalar = new Real(45);
    repository.add(new UnitConverter(domain, system, authority, "S", "small", grammeConverter,
        function (value) {
            return value.mul(smallScalar);
        }, function (value) {
            return value.div(smallScalar);
        }));

    const peeweeScalar = new Real(41);
    repository.add(new UnitConverter(domain, system, authority, "peewee", "peewee", grammeConverter,
        function (value) {
            return value.mul(peeweeScalar);
        }, function (value) {
            return value.div(peeweeScalar);
        }));
};