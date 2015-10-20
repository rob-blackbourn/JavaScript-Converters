var Converter = require('../../converter');

var numbers = require('../../numbers'),
    Fraction = numbers.Fraction,
    Real = numbers.Real;

module.exports = function (repository, system, authority) {

    var domain = "length";

    var meterConverter = repository.find({ name: 'meter' });
    var meterScalar = new Real(new Fraction(3048, 10000));
    var feetConverter = repository.add(new Converter(domain, system, authority, "ft", "feet", meterConverter,
        function (feet) {
            return feet.mul(meterScalar);
        }, function (meter) {
            return meter.div(meterScalar);
        }));

    var thouScalar = new Real(12000);
    repository.add(new Converter(domain, system, authority, "th", "thou", feetConverter,
        function (feet) {
            return feet.div(thouScalar);
        }, function (thou) {
            return thou.mul(thouScalar);
        }));

    var inchScalar = new Real(12);
    repository.add(new Converter(domain, system, authority, "in", "inch", feetConverter,
        function (feet) {
            return feet.div(inchScalar);
        }, function (inch) {
            return inch.mul(inchScalar);
        }));

    var yardScalar = new Real(3);
    repository.add(new Converter(domain, system, authority, "yd", "yard", feetConverter,
        function (feet) {
            return feet.mul(yardScalar);
        }, function (yard) {
            return yard.div(yardScalar);
        }));

    var chainScalar = new Real(66);
    repository.add(new Converter(domain, system, authority, "ch", "chain", feetConverter,
        function (feet) {
            return feet.mul(chainScalar);
        }, function (chain) {
            return chain.div(chainScalar);
        }));

    var furlongScalar = new Real(660);
    repository.add(new Converter(domain, system, authority, "fur", "furlong", feetConverter,
        function (feet) {
            return feet.mul(furlongScalar);
        }, function (furlong) {
            return furlong.div(furlongScalar);
        }));

    var mileScalar = new Real(5280);
    repository.add(new Converter(domain, system, authority, "mi", "mile", feetConverter,
        function (feet) {
            return feet.mul(mileScalar);
        }, function (mile) {
            return mile.div(mileScalar);
        }));

    var leagueScalar = new Real(15840);
    repository.add(new Converter(domain, system, authority, "lea", "league", feetConverter,
        function (feet) {
            return feet.mul(leagueScalar);
        }, function (league) {
            return league.div(leagueScalar);
        }));
};