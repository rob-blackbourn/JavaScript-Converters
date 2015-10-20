var Converter = require('../../converter');

var numbers = require('../../numbers'),
    Fraction = numbers.Fraction,
    Real = numbers.Real;

module.exports = function (repository) {

    var kelvinConverter = repository.find({ name: 'Kelvin' });

    var celsiusOffset = new Real(new Fraction(27315, 100));
    var celsiusConverter = repository.add(new Converter("temperature", "metric", "si", '\u00b0C', "Celsius", kelvinConverter,
        function (celsius) {
            return celsius.add(celsiusOffset);
        }, function (kelvin) {
            return kelvin.sub(celsiusOffset);
        }));

    var fahrenheitOffset = new Real(32);
    var fahrenheitScalar = new Real(new Fraction(9, 5));
    repository.add(new Converter("temperature", "imperial", "UK", '\u00b0F', "Fahrenheit", celsiusConverter,
        function (farenheit) {
            return farenheit.sub(fahrenheitOffset).div(fahrenheitScalar);
        }, function (celsius) {
            return celsius.mul(fahrenheitScalar).add(fahrenheitOffset);
        }));

    var gasMarkScalar = new Real(14);
    var gasMarkOffset = new Real(121);
    repository.add(new Converter("temperature", "imperial", "UK", "GM", "Gas Mark", celsiusConverter,
        function (gasMark) {
            if (gasMark.lt(new Real(new Fraction(3, 8)))) {
                return new Real(107);
            } else if (gasMark.lt(new Real(new Fraction(3,4)))) {
                return new Real(121);
            } else {
                gasMark = new Real(Math.round(gasMark.valueOf()));
                return gasMark.mul(gasMarkScalar).add(gasMarkOffset);
            }
        }, function (celsius) {
            if (celsius.lt(new Real(114))) {
                return new Real(new Fraction(1, 4));
            } else if (celsius.lt(new Real(128))) {
                return new Real(new Fraction(1, 2));
            } else {
                var gasMark = celsius.sub(gasMarkOffset).div(gasMarkScalar);
                return new Real(Math.round(gasMark));
            }
        }));
};