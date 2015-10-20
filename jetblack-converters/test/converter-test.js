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

    it('Should convert gas mark to celcius.', function () {

        var gasMarkConverter = repository.find({ name: 'Gas Mark' });
        var celsiusConverter = repository.find({ name: 'Celsius' });

        var celsius = new Real(135);
        var gasMark = celsiusConverter.convert(celsius, gasMarkConverter);
        assert.equal(gasMark.valueOf(), 1, "135 Celsius is Gas Mark 1.");

        celsius = new Real(247);
        gasMark = celsiusConverter.convert(celsius, gasMarkConverter);
        assert.equal(gasMark.valueOf(), 9, "247 Celsius is Gas Mark 9.");

        gasMark = new Real(1);
        celsius = gasMarkConverter.convert(gasMark, celsiusConverter);
        assert.equal(celsius.valueOf(), 135, "Gas Mark 1 is 135 Celsius.");

        gasMark = new Real(9);
        celsius = gasMarkConverter.convert(gasMark, celsiusConverter);
        assert.equal(celsius.valueOf(), 247, "Gas Mark 9 is 247 Celsius.");

        gasMark = new Real(new Fraction(1, 4));
        celsius = gasMarkConverter.convert(gasMark, celsiusConverter);
        assert.equal(celsius.valueOf(), 107, "Gas Mark 1/4 is 107 Celsius.");

        gasMark = new Real(new Fraction(1, 2));
        celsius = gasMarkConverter.convert(gasMark, celsiusConverter);
        assert.equal(celsius.valueOf(), 121, "Gas Mark 1/2 is 121 Celsius.");

        celsius = new Real(107);
        gasMark = celsiusConverter.convert(celsius, gasMarkConverter);
        assert.ok(gasMark.eq(new Real(new Fraction(1, 4))), "107 Celsius is Gas Mark 1/4.");

        celsius = new Real(121);
        gasMark = celsiusConverter.convert(celsius, gasMarkConverter);
        assert.ok(gasMark.eq(new Real(new Fraction(1, 2))), "121 Celsius is Gas Mark 1/4.");
    });

    it('Should convert gas mark to fahrenheit.', function () {

        var gasMarkConverter = repository.find({ name: 'Gas Mark' });
        var fahrenheitConverter = repository.find({ name: 'Fahrenheit' });

        var fahrenheit = new Real(275);
        //var gasMark = fahrenheitConverter.convert(fahrenheit, gasMarkConverter);
        //assert.equal(gasMark.valueOf(), 1, "275 Fahrenheit is Gas Mark 1.");

        //fahrenheit = new Real(475);
        //gasMark = fahrenheitConverter.convert(fahrenheit, gasMarkConverter);
        //assert.equal(gasMark.valueOf(), 9, "475 Fahrenheit is Gas Mark 9.");

        //gasMark = new Real(1);
        //fahrenheit = gasMarkConverter.convert(gasMark, fahrenheitConverter);
        //assert.equal(fahrenheit.valueOf(), 275, "Gas Mark 1 is 275 Fahrenheit.");

        gasMark = new Real(9);
        fahrenheit = gasMarkConverter.convert(gasMark, fahrenheitConverter);
        assert.equal(fahrenheit.valueOf(), 476.6, "Gas Mark 9 is 476.6 Fahrenheit.");

        gasMark = new Real(new Fraction(1, 4));
        fahrenheit = gasMarkConverter.convert(gasMark, fahrenheitConverter);
        assert.equal(fahrenheit.valueOf(), 224.6, "Gas Mark 1/4 is 224.6 Fahrenheit.");

        gasMark = new Real(new Fraction(1, 2));
        fahrenheit = gasMarkConverter.convert(gasMark, fahrenheitConverter);
        assert.equal(fahrenheit.valueOf(), 249.8, "Gas Mark 1/2 is 249.8 Fahrenheit.");

        fahrenheit = new Real(225);
        gasMark = fahrenheitConverter.convert(fahrenheit, gasMarkConverter);
        assert.ok(gasMark.eq(new Real(new Fraction(1, 4))), "225 Fahrenheit is Gas Mark 1/4.");

        fahrenheit = new Real(250);
        gasMark = fahrenheitConverter.convert(fahrenheit, gasMarkConverter);
        assert.ok(gasMark.eq(new Real(new Fraction(1, 2))), "250 Fahrenheit is Gas Mark 1/4.");
    });

})
