var assert = require('assert');

var converters = require('../lib/index.js'),
    Converter = converters.Converter,
    repository = converters.repository,
    numbers = converters.numbers,
    Fraction = numbers.Fraction,
    Real = numbers.Real;


describe('converter', function () {

    it('Should convert inches to millimeters.', function () {

        var millimeterConverter = repository.find({ name: 'millimeter' });
        var inchConverter = repository.find({ system: 'imperial', name: 'inch' });

        var millis = inchConverter.convert(new Fraction(1, 1), millimeterConverter);
        var result = millis.valueOf();

        assert.equal(result, 25.4, "There are 25.4 millimeters in an inch.");
    });

    it('Should convert millimeters to inches.', function () {

        var millimeterConverter = repository.find({ name: 'millimeter' });
        var inchConverter = repository.find({ system: 'imperial', name: 'inch' });

        var inches = millimeterConverter.convert(new Real(25.4), inchConverter);
        var result = inches.valueOf();

        assert.equal(result, 1, "There are 25.4 millimeters in an inch.");
    });

    it('Should convert fahrenheit to celcius.', function () {

        var fahrenheitConverter = repository.find({ name: 'Fahrenheit' });
        var celsiusConverter = repository.find({ name: 'Celsius' });

        var celsius = new Real(0);
        var fahrenheit = celsiusConverter.convert(celsius, fahrenheitConverter);
        assert.equal(fahrenheit.valueOf(), 32, "0 Celsius is 32 Fahrenheit.");

        celsius = new Real(100);
        fahrenheit = celsiusConverter.convert(celsius, fahrenheitConverter);
        assert.equal(fahrenheit.valueOf(), 212, "100 Celsius is 212 Fahrenheit.");

        fahrenheit = new Real(32);
        celsius = fahrenheitConverter.convert(fahrenheit, celsiusConverter);
        assert.equal(celsius.valueOf(), 0, "32 Fahrenheit is 0 Celsius.");

        fahrenheit = new Real(212);
        celsius = fahrenheitConverter.convert(fahrenheit, celsiusConverter);
        assert.equal(celsius.valueOf(), 100, "212 Fahrenheit is 100 Celsius.");

        fahrenheit = new Real(-40);
        celsius = fahrenheitConverter.convert(fahrenheit, celsiusConverter);
        assert.equal(celsius.valueOf(), -40, "-40 Fahrenheit is -40 Celsius.");

        celsius = new Real(-40);
        fahrenheit = celsiusConverter.convert(celsius, fahrenheitConverter);
        assert.equal(fahrenheit.valueOf(), -40, "-40 Celsius is -40 Fahrenheit.");
    });

})
