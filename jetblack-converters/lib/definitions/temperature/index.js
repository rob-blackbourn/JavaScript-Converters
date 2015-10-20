var Converter = require('../../converter');

var numbers = require('../../numbers'),
    Fraction = numbers.Fraction,
    Real = numbers.Real;

module.exports = function (repository) {

    var kelvinConverter = repository.find({ name: 'Kelvin' });

    var celsiusOffset = new Real(new Fraction(27315, 100));
    var celsiusConverter = repository.add(new Converter("temperature", "metric", "si", '\u00b0C', "Celsius", kelvinConverter,
        function (value) {
            return value.add(celsiusOffset);
        }, function (value) {
            return value.sub(celsiusOffset);
        }));

    var fahrenheitOffset = new Real(32);
    var fahrenheitScalar = new Fraction(9, 5);
    repository.add(new Converter("temperature", "imperial", "UK", '\u00b0F', "Fahrenheit", celsiusConverter,
        function (value) {
            return value.sub(fahrenheitOffset).div(fahrenheitScalar);
        }, function (value) {
            return value.mul(fahrenheitScalar).add(fahrenheitOffset);
        }));

    repository.add(new Converter("temperature", "imperial", "UK", "GM", "Gas Mark", kelvinConverter,
        function (value) {
            return value.mul(125).div(9).add(422.038);
        }, function (value) {
            return value.sub(422.038).mul(9).div(125);
        }));
};