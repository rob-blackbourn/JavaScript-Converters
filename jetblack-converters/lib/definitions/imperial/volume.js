var Converter = require('../../converter');

var numbers = require('../../numbers'),
    Fraction = numbers.Fraction,
    Real = numbers.Real;

module.exports = function (repository, system, authority) {

    var domain = "volume";

    var litreConverter = repository.find({ name: 'litre' });
    var litreScalar = new Real(new Fraction(56826125, 100000000));
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

    var fluidScrupleScalar = new Real(480);
    repository.add(new Converter(domain, system, authority, "fl scruple", "fluid scruple", pintConverter,
        function (pint) {
            return pint.div(fluidScrupleScalar);
        }, function (fluidScruple) {
            return fluidScruple.mul(fluidScrupleScalar);
        }));

    var fluidDrachmScalar = new Real(160);
    repository.add(new Converter(domain, system, authority, "fl dr", "fluid drachm", pintConverter,
        function (pint) {
            return pint.div(fluidDrachmScalar);
        }, function (fluidDrachm) {
            return fluidDrachm.mul(fluidDrachmScalar);
        }));

    var fluidOunceScalar = new Real(20);
    repository.add(new Converter(domain, system, authority, "fl oz", "fluid ounce", pintConverter,
        function (pint) {
            return pint.div(fluidOunceScalar);
        }, function (fluidOunce) {
            return fluidOunce.mul(fluidOunceScalar);
        }));

    var gillScalar = new Real(4);
    repository.add(new Converter(domain, system, authority, "gl", "gill", pintConverter,
        function (pint) {
            return pint.div(gillScalar);
        }, function (gill) {
            return gill.mul(gillScalar);
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