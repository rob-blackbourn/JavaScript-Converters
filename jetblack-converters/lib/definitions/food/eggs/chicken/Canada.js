var UnitConverter = require('../../../../unit-converter');

var numbers = require('../../../../numbers'),
    Fraction = numbers.Fraction,
    Real = numbers.Real;

module.exports = function (repository) {

    var grammeConverter = repository.find({ authority: 'si', system: 'metric', name: 'gramme' });

    var jumboScalar = new Real(70);
    repository.add(new UnitConverter("mass", "food/chicken/eggs", "CAN", "jumbo", "jumbo", grammeConverter,
        function (value) {
            return value.mul(jumboScalar);
        }, function (value) {
            return value.div(jumboScalar);
        }));

    var veryLargeScalar = new Real(66);
    repository.add(new UnitConverter("mass", "food/chicken/eggs", "CAN", "XL", "very large", grammeConverter,
        function (value) {
            return value.mul(veryLargeScalar);
        }, function (value) {
            return value.div(veryLargeScalar);
        }));

    var largeScalar = new Real(59);
    repository.add(new UnitConverter("mass", "food/chicken/eggs", "CAN", "L", "large", grammeConverter,
        function (value) {
            return value.mul(largeScalar);
        }, function (value) {
            return value.div(largeScalar);
        }));

    var mediumScalar = new Real(52);
    repository.add(new UnitConverter("mass", "food/chicken/eggs", "CAN", "M", "medium", grammeConverter,
        function (value) {
            return value.mul(mediumScalar);
        }, function (value) {
            return value.div(mediumScalar);
        }));

    var smallScalar = new Real(45);
    repository.add(new UnitConverter("mass", "food/chicken/eggs", "CAN", "S", "small", grammeConverter,
        function (value) {
            return value.mul(smallScalar);
        }, function (value) {
            return value.div(smallScalar);
        }));

    var peeweeScalar = new Real(41);
    repository.add(new UnitConverter("mass", "food/chicken/eggs", "CAN", "peewee", "peewee", grammeConverter,
        function (value) {
            return value.mul(peeweeScalar);
        }, function (value) {
            return value.div(peeweeScalar);
        }));
 };