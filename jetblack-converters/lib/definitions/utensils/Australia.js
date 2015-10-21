var UnitConverter = require('../../unit-converter');

var numbers = require('../../numbers'),
    Fraction = numbers.Fraction,
    Real = numbers.Real;

module.exports = function (repository) {

    var litreConverter = repository.find({ name: 'litre' });

    var teaspoonScalar = new Real(new Fraction(5, 1000));
    repository.add(new UnitConverter("volume", "utensils", "AUS", "tsp", "teaspoon", litreConverter,
        function (value) {
            return value.mul(teaspoonScalar);
        }, function (value) {
            return value.div(teaspoonScalar);
        }));

    var dessertspoonScalar = new Real(new Fraction(10, 1000));
    repository.add(new UnitConverter("volume", "utensils", "AUS", "dstspn", "dessertspoon", litreConverter,
        function (value) {
            return value.mul(dessertspoonScalar);
        }, function (value) {
            return value.div(dessertspoonScalar);
        }));

    var tablespoonScalar = new Real(new Fraction(20, 1000));
    repository.add(new UnitConverter("volume", "utensils", "AUS", "tbsp", "tablespoon", litreConverter,
        function (value) {
            return value.mul(tablespoonScalar);
        }, function (value) {
            return value.div(tablespoonScalar);
        }));

    var cupScalar = new Real(new Fraction(250, 1000));
    repository.add(new UnitConverter("volume", "utensils", "AUS", "cup", "cup", litreConverter,
        function (value) {
            return value.mul(cupScalar);
        }, function (value) {
            return value.div(cupScalar);
        }));
};