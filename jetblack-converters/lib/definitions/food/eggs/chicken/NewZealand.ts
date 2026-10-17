import type { ConverterRepository } from '../../../../index';
import { Real, UnitConverter } from '../../../../index';

export default function (repository: ConverterRepository) {

    const domain = 'mass'
    const system = "food/chicken/eggs"
    const authority = 'NZ'

    const grammeConverter = repository.find({ authority: 'si', system: 'metric', name: 'gramme' });

    const jumboScalar = new Real(68);
    repository.add(new UnitConverter(domain, system, authority, "size 8", "jumbo", grammeConverter,
        function (value) {
            return value.mul(jumboScalar);
        }, function (value) {
            return value.div(jumboScalar);
        }));

    const largeScalar = new Real(62);
    repository.add(new UnitConverter(domain, system, authority, "size 7", "large", grammeConverter,
        function (value) {
            return value.mul(largeScalar);
        }, function (value) {
            return value.div(largeScalar);
        }));

    const standardScalar = new Real(53);
    repository.add(new UnitConverter(domain, system, authority, "size 6", "standard", grammeConverter,
        function (value) {
            return value.mul(standardScalar);
        }, function (value) {
            return value.div(standardScalar);
        }));

    const mediumScalar = new Real(44);
    repository.add(new UnitConverter(domain, system, authority, "size 5", "medium", grammeConverter,
        function (value) {
            return value.mul(mediumScalar);
        }, function (value) {
            return value.div(mediumScalar);
        }));

    const pulletScalar = new Real(35);
    repository.add(new UnitConverter(domain, system, authority, "size 4", "pullet", grammeConverter,
        function (value) {
            return value.mul(pulletScalar);
        }, function (value) {
            return value.div(pulletScalar);
        }));
};