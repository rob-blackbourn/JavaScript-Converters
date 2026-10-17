import type { ConverterRepository } from '../../../../index';
import { Real, UnitConverter } from '../../../../index';

export default function (repository: ConverterRepository) {

    const domain = 'mass';
    const system = "foo/chicken/eggs"
    const authority = 'EU';

    const grammeConverter = repository.find({ authority: 'si', system: 'metric', name: 'gramme' });

    const veryLargeScalar = new Real(73);
    repository.add(new UnitConverter(domain, system, authority, "XL", "very large", grammeConverter,
        function (value) {
            return value.mul(veryLargeScalar);
        }, function (value) {
            return value.div(veryLargeScalar);
        }));

    const largeScalar = new Real(68);
    repository.add(new UnitConverter(domain, system, authority, "L", "large", grammeConverter,
        function (value) {
            return value.mul(largeScalar);
        }, function (value) {
            return value.div(largeScalar);
        }));

    const mediumScalar = new Real(58);
    repository.add(new UnitConverter(domain, system, authority, "M", "medium", grammeConverter,
        function (value) {
            return value.mul(mediumScalar);
        }, function (value) {
            return value.div(mediumScalar);
        }));

    const smallScalar = new Real(53);
    repository.add(new UnitConverter(domain, system, authority, "S", "small", grammeConverter,
        function (value) {
            return value.mul(smallScalar);
        }, function (value) {
            return value.div(smallScalar);
        }));

};