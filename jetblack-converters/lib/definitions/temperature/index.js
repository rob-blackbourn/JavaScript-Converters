var Converter = require('../../converter');

var numbers = require('../../numbers'),
    Fraction = numbers.Fraction,
    Real = numbers.Real;

module.exports = function (repository) {

    var kelvinConverter = repository.find({ name: 'Kelvin' });

    var celsiusOffset = new Real(new Fraction(27315, 100));
    repository.add(new Converter("temperature", "metric", "si", '\u00b0C', "Celsius", kelvinConverter,
        function (value) {
            return value.add(celsiusOffset);
        }, function (value) {
            return value.sub(celsiusOffset);
        }));

    repository.add(new Converter("temperature", "imperial", "UK", '\u00b0F', "Fahrenheit", kelvinConverter,
        function (value) {
            return value.add(459.67).mul(5).div(9);
        }, function (value) {
            return value.mul(9).div(5).sub(459.67);
        }));

    repository.add(new Converter("temperature", "imperial", "UK", "GM", "Gas Mark", kelvinConverter,
        function (value) {
            return value.mul(125).div(9).add(422.038);
        }, function (value) {
            return value.sub(422.038).mul(9).div(125);
        }));
};