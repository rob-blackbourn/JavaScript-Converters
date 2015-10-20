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

})
