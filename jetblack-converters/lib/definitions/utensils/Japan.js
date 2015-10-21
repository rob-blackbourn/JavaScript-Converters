var UnitConverter = require('../../unit-converter');

var numbers = require('../../numbers'),
    Fraction = numbers.Fraction,
    Real = numbers.Real;

module.exports = function (repository) {

    var litreConverter = repository.find({ name: 'litre' });

    var goScalar = new Real(new Fraction(2401, 133100));
    repository.add(new UnitConverter("volume", "utensils", "JPN", "go", "go", litreConverter,
        function (value) {
            return value.mul(goScalar);
        }, function (value) {
            return value.div(goScalar);
        }));

    var cupScalar = new Real(new Fraction(200, 1000));
    repository.add(new UnitConverter("volume", "utensils", "JPN", "cup", "cup", litreConverter,
        function (value) {
            return value.mul(cupScalar);
        }, function (value) {
            return value.div(cupScalar);
        }));
};