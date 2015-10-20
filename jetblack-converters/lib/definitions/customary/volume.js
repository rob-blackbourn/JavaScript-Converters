var Converter = require('../../converter');

var numbers = require('../../numbers'),
    Fraction = numbers.Fraction,
    Real = numbers.Real;

module.exports = function (repository, system, authority) {

    var domain = "volume";

    var litreConverter = repository.find({ name: 'litre' });
    var litreScalar = new Real(new Fraction(4732, 10000));
    var pintConverter = repository.add(new Converter(domain, system, authority, "pt", "pint", litreConverter,
        function (pint) {
            return pint.mul(litreScalar);
        }, function (litre) {
            return litre.div(litreScalar);
        }));

    var minimScalar = new Real(9600);
    repository.add(new Converter(domain, system, authority, "min", "minim", pintConverter,
        function (pint) {
            return pint.div(minimScalar);
        }, function (minim) {
            return minim.mul(minimScalar);
        }));

    var fluidDramScalar = new Real(160);
    repository.add(new Converter(domain, system, authority, "fl dr", "fluid dram", pintConverter,
        function (pint) {
            return pint.div(fluidDramScalar);
        }, function (fluidDram) {
            return fluidDram.mul(fluidDramScalar);
        }));

    var fluidOunceScalar = new Real(16);
    repository.add(new Converter(domain, system, authority, "fl oz", "fluid ounce", pintConverter,
        function (pint) {
            return pint.div(fluidOunceScalar);
        }, function (fluidOunce) {
            return fluidOunce.mul(fluidOunceScalar);
        }));

    var quartScalar = new Real(2);
    repository.add(new Converter(domain, system, authority, "qt", "quart", pintConverter,
        function (pint) {
            return pint.mul(quartScalar);
        }, function (quart) {
            return quart.div(quartScalar);
        }));

    var gallonScalar = new Real(8);
    repository.add(new Converter(domain, system, authority, "gal", "gallon", pintConverter,
        function (pint) {
            return pint.mul(gallonScalar);
        }, function (gallon) {
            return gallon.div(gallonScalar);
        }));
};