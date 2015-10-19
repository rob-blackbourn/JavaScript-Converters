var assert = require('assert');

var converters = require('../lib/index.js'),
    Converter = converters.Converter,
    repository = converters.repository,
    numbers = converters.numbers,
    Fraction = numbers.Fraction,
    Real = numbers.Real;


describe('converter', function () {

    it('Should convert inches to millimeters', function () {

        var millimeterConverter = repository.find({ name: 'millimeter' });
        var inchConverter = repository.find({ system: 'imperial', name: 'inch' });

        var result = inchConverter.convert(new Fraction(1, 1), millimeterConverter);

        assert.equal(result.valueOf(), 25.4, "There are 25.4 millimeters in an inch.");
    });

    it('Should convert millimeters to inches', function () {

        var millimeterConverter = repository.find({ name: 'millimeter' });
        var inchConverter = repository.find({ system: 'imperial', name: 'inch' });

        var result = millimeterConverter.convert(new Real(25.4), inchConverter);

        assert.equal(result.valueOf(), 1, "There are 25.4 millimeters in an inch.");
    });

})
