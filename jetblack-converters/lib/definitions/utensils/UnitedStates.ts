import type { ConverterRepository } from '../../index';
import { UnitConverter } from '../../index';

export default function (repository: ConverterRepository) {
    const domain = 'volume';
    const system = 'utensils';
    const authority = 'US'

    var usaFluidOunceConverter = repository.find({ authority: authority, name: 'fluid ounce' });

    repository.add(new UnitConverter(domain, system, authority, "drop", "drop", usaFluidOunceConverter,
        function (value) {
            return value.mul(576);
        }, function (value) {
            return value.div(576);
        }));

    repository.add(new UnitConverter(domain, system, authority, "tsp", "teaspoon", usaFluidOunceConverter,
        function (value) {
            return value.mul(6);
        }, function (value) {
            return value.div(6);
        }));

    repository.add(new UnitConverter(domain, system, authority, "tbsp", "tablespoon", usaFluidOunceConverter,
        function (value) {
            return value.mul(2);
        }, function (value) {
            return value.div(2);
        }));

    repository.add(new UnitConverter(domain, system, authority, "cup", "cup", usaFluidOunceConverter,
        function (value) {
            return value.div(8);
        }, function (value) {
            return value.mul(8);
        }));
};