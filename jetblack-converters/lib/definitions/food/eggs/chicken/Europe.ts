import type { ConverterRepository } from '../../../../repository';
import { UnitConverter } from '../../../../UnitConverter';

import { Fraction, Real } from '../../../../numbers';

export default function (repository: ConverterRepository) {

    var grammeConverter = repository.find({ authority: 'si', system: 'metric', name: 'gramme' });

    var veryLargeScalar = new Real(73);
    repository.add(new UnitConverter("mass", "food/chicken/eggs", "EUR", "XL", "very large", grammeConverter,
        function (value) {
            return value.mul(veryLargeScalar);
        }, function (value) {
            return value.div(veryLargeScalar);
        }));

    var largeScalar = new Real(68);
    repository.add(new UnitConverter("mass", "food/chicken/eggs", "EUR", "L", "large", grammeConverter,
        function (value) {
            return value.mul(largeScalar);
        }, function (value) {
            return value.div(largeScalar);
        }));

    var mediumScalar = new Real(58);
    repository.add(new UnitConverter("mass", "food/chicken/eggs", "EUR", "M", "medium", grammeConverter,
        function (value) {
            return value.mul(mediumScalar);
        }, function (value) {
            return value.div(mediumScalar);
        }));

    var smallScalar = new Real(53);
    repository.add(new UnitConverter("mass", "food/chicken/eggs", "EUR", "S", "small", grammeConverter,
        function (value) {
            return value.mul(smallScalar);
        }, function (value) {
            return value.div(smallScalar);
        }));

};