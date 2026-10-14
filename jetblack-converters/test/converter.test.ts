

import { repository, Fraction, Real } from '../lib';


describe('converter', function () {

    it('Should convert meters to meters.', function () {

        var meterConverter = repository.find({ name: 'meter' })!;

        var result = meterConverter.convert(1, meterConverter);

        expect(result.valueOf()).toBe(1);
    });

    it('Should convert centimeters to millimeters.', function () {

        var centimeterConverter = repository.find({ name: 'centimeter' })!;
        var millimeterConverter = repository.find({ name: 'millimeter' })!;

        var millimeters = centimeterConverter.convert(10, millimeterConverter);
        expect(millimeters.valueOf()).toBe(100);

        var centimeters = millimeterConverter.convert(100, centimeterConverter);
        expect(centimeters.valueOf()).toBe(10);
    });

    it('Should convert inches to millimeters.', function () {

        var millimeterConverter = repository.find({ name: 'millimeter' })!;
        var inchConverter = repository.find({ system: 'imperial', name: 'inch' })!;

        var millimeters = inchConverter.convert(1, millimeterConverter);

        expect(millimeters.valueOf()).toBe(25.4);
    });

    it('Should convert millimeters to inches.', function () {

        var millimeterConverter = repository.find({ name: 'millimeter' })!;
        var inchConverter = repository.find({ system: 'imperial', name: 'inch' })!;

        var inches = millimeterConverter.convert(25.4, inchConverter);
        expect(Math.abs(inches.valueOf() - 1) <= Number.EPSILON).toBeTruthy();
    });

    it('Should convert fahrenheit to celcius.', function () {

        var fahrenheitConverter = repository.find({ name: 'Fahrenheit' })!;
        var celsiusConverter = repository.find({ name: 'Celsius' })!;

        var fahrenheit = celsiusConverter.convert(0, fahrenheitConverter);
        expect(fahrenheit.valueOf()).toBe(32);

        fahrenheit = celsiusConverter.convert(100, fahrenheitConverter);
        expect(fahrenheit.valueOf()).toBe(212);

        var celsius = fahrenheitConverter.convert(32, celsiusConverter);
        expect(celsius.valueOf()).toBe(0);

        celsius = fahrenheitConverter.convert(212, celsiusConverter);
        expect(celsius.valueOf()).toBe(100);

        celsius = fahrenheitConverter.convert(-40, celsiusConverter);
        expect(celsius.valueOf()).toBe(-40);

        fahrenheit = celsiusConverter.convert(-40, fahrenheitConverter);
        expect(fahrenheit.valueOf()).toBe(-40);
    });

    it('Should convert gas mark to celcius.', function () {

        var gasMarkConverter = repository.find({ name: 'Gas Mark' })!;
        var celsiusConverter = repository.find({ name: 'Celsius' })!;

        var gasMark = celsiusConverter.convert(135, gasMarkConverter);
        expect(gasMark.valueOf()).toBe(1);

        gasMark = celsiusConverter.convert(247, gasMarkConverter);
        expect(gasMark.valueOf()).toBe(9);

        var celsius = gasMarkConverter.convert(1, celsiusConverter);
        expect(celsius.valueOf()).toBe(135);

        celsius = gasMarkConverter.convert(9, celsiusConverter);
        expect(celsius.valueOf()).toBe(247);

        celsius = gasMarkConverter.convert(new Fraction(1, 4), celsiusConverter);
        expect(celsius.valueOf()).toBe(107);

        celsius = gasMarkConverter.convert(new Fraction(1, 2), celsiusConverter);
        expect(celsius.valueOf()).toBe(121);

        gasMark = celsiusConverter.convert(107, gasMarkConverter);
        expect(gasMark.eq(new Real(new Fraction(1, 4)))).toBeTruthy();

        gasMark = celsiusConverter.convert(121, gasMarkConverter);
        expect(gasMark.eq(new Real(new Fraction(1, 2)))).toBeTruthy();
    });

    it('Should convert gas mark to fahrenheit.', function () {

        var gasMarkConverter = repository.find({ name: 'Gas Mark' })!;
        var fahrenheitConverter = repository.find({ name: 'Fahrenheit' })!;

        var gasMark, fahrenheit;

        gasMark = fahrenheitConverter.convert(275, gasMarkConverter);
        expect(gasMark.valueOf()).toBe(1);

        gasMark = fahrenheitConverter.convert(475, gasMarkConverter);
        expect(gasMark.valueOf()).toBe(9);

        fahrenheit = gasMarkConverter.convert(1, fahrenheitConverter);
        expect(fahrenheit.valueOf()).toBe(275);

        fahrenheit = gasMarkConverter.convert(9, fahrenheitConverter);
        expect(fahrenheit.valueOf()).toBe(476.6);

        fahrenheit = gasMarkConverter.convert(new Fraction(1, 4), fahrenheitConverter);
        expect(fahrenheit.valueOf()).toBe(224.6);

        fahrenheit = gasMarkConverter.convert(new Fraction(1, 2), fahrenheitConverter);
        expect(fahrenheit.valueOf()).toBe(249.8);

        gasMark = fahrenheitConverter.convert(225, gasMarkConverter);
        expect(gasMark.eq(new Real(new Fraction(1, 4)))).toBeTruthy();

        gasMark = fahrenheitConverter.convert(250, gasMarkConverter);
        expect(gasMark.eq(new Real(new Fraction(1, 2)))).toBeTruthy();
    });

    it('Should convert UK cups to millilitres', function () {

        var cupConverter = repository.find({ authority: 'UK', name: 'cup' })!;
        var millilitreConverter = repository.find({ name: 'millilitre' })!;

        

        var millilitres = cupConverter.convert(1, millilitreConverter);
        expect(Math.round(millilitres.valueOf() * 10) / 10).toBe(284.1);
    });
})
