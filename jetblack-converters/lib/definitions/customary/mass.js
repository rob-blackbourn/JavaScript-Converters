var Converter = require('../../converter');

var numbers = require('../../numbers'),
    Fraction = numbers.Fraction,
    Real = numbers.Real;

module.exports = function (repository, system, authority) {

    var domain = "mass";

    var grammeConverter = repository.find({ name: 'gramme' });
    var grammeScalar = new Real(new Fraction(45359237, 100000));
    var poundConverter = repository.add(new Converter(domain, system, authority, "lb", "pound", grammeConverter,
        function (value) {
            return value.mul(grammeScalar);
        }, function (value) {
            return value.div(grammeScalar);
        }));

    var grainScalar = new Real(7000);
    repository.add(new Converter(domain, system, authority, "gr", "grain", poundConverter,
        function (value) {
            return value.div(grainScalar);
        }, function (value) {
            return value.mul(grainScalar);
        }));

    var dramScalar = new Real(256);
    repository.add(new Converter(domain, system, authority, "dr", "dram", poundConverter,
        function (value) {
            return value.div(dramScalar);
        }, function (value) {
            return value.mul(dramScalar);
        }));

    var ounceScalar = new Real(16);
    repository.add(new Converter(domain, system, authority, "oz", "ounce", poundConverter,
        function (value) {
            return value.div(ounceScalar);
        }, function (value) {
            return value.mul(ounceScalar);
        }));

    var stoneScalar = new Real(16);
    repository.add(new Converter(domain, system, authority, "st", "stone", poundConverter,
        function (value) {
            return value.mul(stoneScalar);
        }, function (value) {
            return value.div(stoneScalar);
        }));

    var quarterScalar = new Real(28);
    repository.add(new Converter(domain, system, authority, "qtr", "quarter", poundConverter,
        function (value) {
            return value.mul(quarterScalar);
        }, function (value) {
            return value.div(quarterScalar);
        }));

    var hundredweightScalar = new Real(112);
    repository.add(new Converter(domain, system, authority, "cwt", "hundredweight", poundConverter,
        function (value) {
            return value.mul(hundredweightScalar);
        }, function (value) {
            return value.div(hundredweightScalar);
        }));

    var tonScalar = new Real(2240);
    repository.add(new Converter(domain, system, authority, "tn", "ton", poundConverter,
        function (value) {
            return value.mul(tonScalar);
        }, function (value) {
            return value.div(tonScalar);
        }));
};