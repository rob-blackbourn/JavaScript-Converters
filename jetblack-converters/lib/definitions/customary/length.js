var Converter = require('../../converter');

var numbers = require('../../numbers'),
    Fraction = numbers.Fraction,
    Real = numbers.Real;

module.exports = function (repository) {

    var meterConverter = repository.find({ name: 'meter' });
    var meterScalar = new Real(new Fraction(3048, 10000));
    var feetConverter = repository.add(new Converter("length", "customary", "USA", "ft", "feet", meterConverter,
        function (value) {
            return value.mul(meterScalar);
        }, function (value) {
            return value.div(meterScalar);
        }));

    var thouScalar = new Real(12000);
    repository.add(new Converter("length", "customary", "USA", "th", "thou", feetConverter,
        function (value) {
            return value.div(thouScalar);
        }, function (value) {
            return value.mul(thouScalar);
        }));

    var inchScalar = new Real(12);
    repository.add(new Converter("length", "customary", "USA", "in", "inch", feetConverter,
        function (value) {
            return value.div(inchScalar);
        }, function (value) {
            return value.mul(inchScalar);
        }));

    var yardScalar = new Real(3);
    repository.add(new Converter("length", "customary", "USA", "yd", "yard", feetConverter,
        function (value) {
            return value.mul(yardScalar);
        }, function (value) {
            return value.div(yardScalar);
        }));

    var chainScalar = new Real(66);
    repository.add(new Converter("length", "customary", "USA", "ch", "chain", feetConverter,
        function (value) {
            return value.mul(chainScalar);
        }, function (value) {
            return value.div(chainScalar);
        }));

    var furlongScalar = new Real(660);
    repository.add(new Converter("length", "customary", "USA", "fur", "furlong", feetConverter,
        function (value) {
            return value.mul(furlongScalar);
        }, function (value) {
            return value.div(furlongScalar);
        }));

    var mileScalar = new Real(5280);
    repository.add(new Converter("length", "customary", "USA", "mi", "mile", feetConverter,
        function (value) {
            return value.mul(mileScalar);
        }, function (value) {
            return value.div(mileScalar);
        }));

    var leagueScalar = new Real(15840);
    repository.add(new Converter("length", "customary", "USA", "lea", "league", feetConverter,
        function (value) {
            return value.mul(leagueScalar);
        }, function (value) {
            return value.div(leagueScalar);
        }));
};