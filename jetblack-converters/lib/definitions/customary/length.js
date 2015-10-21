var UnitConverter = require('../../unit-converter');

var numbers = require('../../numbers'),
    Fraction = numbers.Fraction,
    Real = numbers.Real;

module.exports = function (repository, system, authority) {

    var domain = "length";

    var meterConverter = repository.find({ name: 'meter' });
    var meterScalar = new Real(new Fraction(3048, 10000));
    var feetConverter = repository.add(new UnitConverter(domain, system, authority, "ft", "feet", meterConverter,
        function (value) {
            return value.mul(meterScalar);
        }, function (value) {
            return value.div(meterScalar);
        }));

    var thouScalar = new Real(12000);
    repository.add(new UnitConverter(domain, system, authority, "th", "thou", feetConverter,
        function (value) {
            return value.div(thouScalar);
        }, function (value) {
            return value.mul(thouScalar);
        }));

    var inchScalar = new Real(12);
    repository.add(new UnitConverter(domain, system, authority, "in", "inch", feetConverter,
        function (value) {
            return value.div(inchScalar);
        }, function (value) {
            return value.mul(inchScalar);
        }));

    var yardScalar = new Real(3);
    repository.add(new UnitConverter(domain, system, authority, "yd", "yard", feetConverter,
        function (value) {
            return value.mul(yardScalar);
        }, function (value) {
            return value.div(yardScalar);
        }));

    var chainScalar = new Real(66);
    repository.add(new UnitConverter(domain, system, authority, "ch", "chain", feetConverter,
        function (value) {
            return value.mul(chainScalar);
        }, function (value) {
            return value.div(chainScalar);
        }));

    var furlongScalar = new Real(660);
    repository.add(new UnitConverter(domain, system, authority, "fur", "furlong", feetConverter,
        function (value) {
            return value.mul(furlongScalar);
        }, function (value) {
            return value.div(furlongScalar);
        }));

    var mileScalar = new Real(5280);
    repository.add(new UnitConverter(domain, system, authority, "mi", "mile", feetConverter,
        function (value) {
            return value.mul(mileScalar);
        }, function (value) {
            return value.div(mileScalar);
        }));

    var leagueScalar = new Real(15840);
    repository.add(new UnitConverter(domain, system, authority, "lea", "league", feetConverter,
        function (value) {
            return value.mul(leagueScalar);
        }, function (value) {
            return value.div(leagueScalar);
        }));
};