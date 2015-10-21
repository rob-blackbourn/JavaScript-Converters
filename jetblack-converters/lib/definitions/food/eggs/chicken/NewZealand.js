var UnitConverter = require('../../../../unit-converter');

var numbers = require('../../../../numbers'),
    Fraction = numbers.Fraction,
    Real = numbers.Real;

module.exports = function (repository) {

    var grammeConverter = repository.find({ authority: 'si', system: 'metric', name: 'gramme' });

    var jumboScalar = new Real(68);
    repository.add(new UnitConverter("mass", "food/chicken/eggs", "NZ", "size 8", "jumbo", grammeConverter,
        function (value) {
            return value.mul(jumboScalar);
        }, function (value) {
            return value.div(jumboScalar);
        }));

    var largeScalar = new Real(62);
    repository.add(new UnitConverter("mass", "food/chicken/eggs", "NZ", "size 7", "large", grammeConverter,
        function (value) {
            return value.mul(largeScalar);
        }, function (value) {
            return value.div(largeScalar);
        }));

    var standardScalar = new Real(53);
    repository.add(new UnitConverter("mass", "food/chicken/eggs", "NZ", "size 6", "standard", grammeConverter,
        function (value) {
            return value.mul(standardScalar);
        }, function (value) {
            return value.div(standardScalar);
        }));

    var mediumScalar = new Real(44);
    repository.add(new UnitConverter("mass", "food/chicken/eggs", "NZ", "size 5", "medium", grammeConverter,
        function (value) {
            return value.mul(mediumScalar);
        }, function (value) {
            return value.div(mediumScalar);
        }));

    var pulletScalar = new Real(35);
    repository.add(new UnitConverter("mass", "food/chicken/eggs", "NZ", "size 4", "pullet", grammeConverter,
        function (value) {
            return value.mul(pulletScalar);
        }, function (value) {
            return value.div(pulletScalar);
        }));
};