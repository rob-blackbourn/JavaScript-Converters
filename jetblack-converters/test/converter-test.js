var assert = require('assert');

var converters = require('../lib/index.js'),
    Converter = converters.Converter,
    repository = converters.repository,
    numbers = converters.numbers,
    Fraction = numbers.Fraction,
    Real = numbers.Real;


describe('converter', function () {

    it('Should convert meters to meters.', function () {

        var meterConverter = repository.find({ name: 'meter' });

        var result = meterConverter.convert(1, meterConverter);

        assert.equal(result.valueOf(), 1, "A meter is a meter.");
    });

    it('Should convert centimeters to millimeters.', function () {

        var centimeterConverter = repository.find({ name: 'centimeter' });
        var millimeterConverter = repository.find({ name: 'millimeter' });

        var millimeters = centimeterConverter.convert(10, millimeterConverter);
        assert.equal(millimeters.valueOf(), 100, "There are 100 millimeters in 10 centimeters.");

        var centimeters = millimeterConverter.convert(100, centimeterConverter);
        assert.equal(centimeters.valueOf(), 10, "There are 10 centimeters in 100 millimeters.");
    });

    it('Should convert inches to millimeters.', function () {

        var millimeterConverter = repository.find({ name: 'millimeter' });
        var inchConverter = repository.find({ system: 'imperial', name: 'inch' });

        var millimeters = inchConverter.convert(1, millimeterConverter);

        assert.equal(millimeters.valueOf(), 25.4, "There are 25.4 millimeters in an inch.");
    });

    it('Should convert millimeters to inches.', function () {

        var millimeterConverter = repository.find({ name: 'millimeter' });
        var inchConverter = repository.find({ system: 'imperial', name: 'inch' });

        var inches = millimeterConverter.convert(25.4, inchConverter);
        assert.ok(Math.abs(inches.valueOf() - 1) <= Number.EPSILON, "There are 25.4 millimeters in an inch.");
    });

    it('Should convert fahrenheit to celcius.', function () {

        var fahrenheitConverter = repository.find({ name: 'Fahrenheit' });
        var celsiusConverter = repository.find({ name: 'Celsius' });

        var fahrenheit = celsiusConverter.convert(0, fahrenheitConverter);
        assert.equal(fahrenheit.valueOf(), 32, "0 Celsius is 32 Fahrenheit.");

        fahrenheit = celsiusConverter.convert(100, fahrenheitConverter);
        assert.equal(fahrenheit.valueOf(), 212, "100 Celsius is 212 Fahrenheit.");

        var celsius = fahrenheitConverter.convert(32, celsiusConverter);
        assert.equal(celsius.valueOf(), 0, "32 Fahrenheit is 0 Celsius.");

        celsius = fahrenheitConverter.convert(212, celsiusConverter);
        assert.equal(celsius.valueOf(), 100, "212 Fahrenheit is 100 Celsius.");

        celsius = fahrenheitConverter.convert(-40, celsiusConverter);
        assert.equal(celsius.valueOf(), -40, "-40 Fahrenheit is -40 Celsius.");

        fahrenheit = celsiusConverter.convert(-40, fahrenheitConverter);
        assert.equal(fahrenheit.valueOf(), -40, "-40 Celsius is -40 Fahrenheit.");
    });

    it('Should convert gas mark to celcius.', function () {

        var gasMarkConverter = repository.find({ name: 'Gas Mark' });
        var celsiusConverter = repository.find({ name: 'Celsius' });

        var gasMark = celsiusConverter.convert(135, gasMarkConverter);
        assert.equal(gasMark.valueOf(), 1, "135 Celsius is Gas Mark 1.");

        gasMark = celsiusConverter.convert(247, gasMarkConverter);
        assert.equal(gasMark.valueOf(), 9, "247 Celsius is Gas Mark 9.");

        var celsius = gasMarkConverter.convert(1, celsiusConverter);
        assert.equal(celsius.valueOf(), 135, "Gas Mark 1 is 135 Celsius.");

        celsius = gasMarkConverter.convert(9, celsiusConverter);
        assert.equal(celsius.valueOf(), 247, "Gas Mark 9 is 247 Celsius.");

        celsius = gasMarkConverter.convert(new Fraction(1, 4), celsiusConverter);
        assert.equal(celsius.valueOf(), 107, "Gas Mark 1/4 is 107 Celsius.");

        celsius = gasMarkConverter.convert(new Fraction(1, 2), celsiusConverter);
        assert.equal(celsius.valueOf(), 121, "Gas Mark 1/2 is 121 Celsius.");

        gasMark = celsiusConverter.convert(107, gasMarkConverter);
        assert.ok(gasMark.eq(new Real(new Fraction(1, 4))), "107 Celsius is Gas Mark 1/4.");

        gasMark = celsiusConverter.convert(121, gasMarkConverter);
        assert.ok(gasMark.eq(new Real(new Fraction(1, 2))), "121 Celsius is Gas Mark 1/4.");
    });

    it('Should convert gas mark to fahrenheit.', function () {

        var gasMarkConverter = repository.find({ name: 'Gas Mark' });
        var fahrenheitConverter = repository.find({ name: 'Fahrenheit' });

        var gasMark, fahrenheit;

        gasMark = fahrenheitConverter.convert(275, gasMarkConverter);
        assert.equal(gasMark.valueOf(), 1, "275 Fahrenheit is Gas Mark 1.");

        gasMark = fahrenheitConverter.convert(475, gasMarkConverter);
        assert.equal(gasMark.valueOf(), 9, "475 Fahrenheit is Gas Mark 9.");

        fahrenheit = gasMarkConverter.convert(1, fahrenheitConverter);
        assert.equal(fahrenheit.valueOf(), 275, "Gas Mark 1 is 275 Fahrenheit.");

        fahrenheit = gasMarkConverter.convert(9, fahrenheitConverter);
        assert.equal(fahrenheit.valueOf(), 476.6, "Gas Mark 9 is 476.6 Fahrenheit.");

        fahrenheit = gasMarkConverter.convert(new Fraction(1, 4), fahrenheitConverter);
        assert.equal(fahrenheit.valueOf(), 224.6, "Gas Mark 1/4 is 224.6 Fahrenheit.");

        fahrenheit = gasMarkConverter.convert(new Fraction(1, 2), fahrenheitConverter);
        assert.equal(fahrenheit.valueOf(), 249.8, "Gas Mark 1/2 is 249.8 Fahrenheit.");

        gasMark = fahrenheitConverter.convert(225, gasMarkConverter);
        assert.ok(gasMark.eq(new Real(new Fraction(1, 4))), "225 Fahrenheit is Gas Mark 1/4.");

        gasMark = fahrenheitConverter.convert(250, gasMarkConverter);
        assert.ok(gasMark.eq(new Real(new Fraction(1, 2))), "250 Fahrenheit is Gas Mark 1/4.");
    });

})
