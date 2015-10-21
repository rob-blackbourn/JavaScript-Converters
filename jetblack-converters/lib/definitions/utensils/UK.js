var UnitConverter = require('../../unit-converter');

var numbers = require('../../numbers'),
    Fraction = numbers.Fraction,
    Real = numbers.Real;

module.exports = function (repository) {

    var litreConverter = repository.find({ system: 'metric', name: 'litre' });
    var pintConverter = repository.find({ system: 'imperial', name: 'pint' });

    var teaspoonScalar = new Real(new Fraction(5, 1000));
    repository.add(new UnitConverter("volume", "utensils", "UK", "tsp", "teaspoon", litreConverter,
        function (value) {
            return value.mul(teaspoonScalar);
        }, function (value) {
            return value.div(teaspoonScalar);
        }));

    var dessertspoonScalar = new Real(new Fraction(10, 1000));
    repository.add(new UnitConverter("volume", "utensils", "UK", "dstspn", "dessertspoon", litreConverter,
        function (value) {
            return value.mul(dessertspoonScalar);
        }, function (value) {
            return value.mul(dessertspoonScalar);
        }));

    var tablespoonScalar = new Real(new Fraction(15, 1000));
    repository.add(new UnitConverter("volume", "utensils", "UK", "tbsp", "tablespoon", litreConverter,
        function (value) {
            return value.mul(tablespoonScalar);
        }, function (value) {
            return value.div(tablespoonScalar);
        }));

    var cupScalar = new Real(2);
    repository.add(new UnitConverter("volume", "utensils", "UK", "cup", "cup", pintConverter,
        function (value) {
            return value.div(cupScalar);
        }, function (value) {
            return value.mul(cupScalar);
        }));
};