var Converter = require('../../converter');

var numbers = require('../../numbers'),
    Fraction = numbers.Fraction,
    Real = numbers.Real;

module.exports = function (repository, system, authority) {

    var domain = "mass";

    var grammeConverter = repository.find({ name: 'gramme' });
    var grammeScalar = new Real(new Fraction(45359237, 100000));
    var poundConverter = repository.add(new Converter(domain, system, authority, "lb", "pound", grammeConverter,
        function (pound) {
            return pound.mul(grammeScalar);
        }, function (gramme) {
            return gramme.div(grammeScalar);
        }));

    var grainScalar = new Real(7000);
    repository.add(new Converter(domain, system, authority, "gr", "grain", poundConverter,
        function (pound) {
            return pound.div(grainScalar);
        }, function (grain) {
            return grain.mul(grainScalar);
        }));

    var drachmScalar = new Real(256);
    repository.add(new Converter(domain, system, authority, "dr", "drachm", poundConverter,
        function (pound) {
            return pound.div(drachmScalar);
        }, function (drachm) {
            return drachm.mul(drachmScalar);
        }));

    var ounceScalar = new Real(16);
    repository.add(new Converter(domain, system, authority, "oz", "ounce", poundConverter,
        function (pound) {
            return pound.div(ounceScalar);
        }, function (ounce) {
            return ounce.mul(ounceScalar);
        }));

    var stoneScalar = new Real(14);
    repository.add(new Converter(domain, system, authority, "st", "stone", poundConverter,
        function (pound) {
            return pound.mul(stoneScalar);
        }, function (stone) {
            return stone.div(stoneScalar);
        }));

    var quarterScalar = new Real(28);
    repository.add(new Converter(domain, system, authority, "qtr", "quarter", poundConverter,
        function (pound) {
            return pound.mul(quarterScalar);
        }, function (quarter) {
            return quarter.div(quarterScalar);
        }));

    var hundredweightScalar = new Real(112);
    repository.add(new Converter(domain, system, authority, "cwt", "hundredweight", poundConverter,
        function (pound) {
            return pound.mul(hundredweightScalar);
        }, function (hundredweight) {
            return hundredweight.div(hundredweightScalar);
        }));

    var tonScalar = new Real(2240);
    repository.add(new Converter(domain, system, authority, "tn", "ton", poundConverter,
        function (pound) {
            return pound.mul(tonScalar);
        }, function (ton) {
            return ton.div(tonScalar);
        }));
};