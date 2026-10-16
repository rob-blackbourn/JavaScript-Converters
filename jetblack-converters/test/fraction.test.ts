

import { Fraction, Real } from '../lib/numbers';

describe('numbers', function () {

    it('Should construct a simple fraction', function () {

        var f1 = new Fraction(1, 2);
        expect(f1.numerator).toBe(1);
        expect(f1.denominator).toBe(2);
    })

    it('Should simplify.', function () {

        var f1 = new Fraction(2, 4);
        expect(f1.numerator).toBe(1);
        expect(f1.denominator).toBe(2);
    })

    it('should return NaN', function () {
        var f = new Fraction(1, 0);
        expect(f.isNaN()).toBeTruthy();
    });

    it('should return construct fractions of value 1', function () {
        for (var i = 1; i <= 10; ++i) {
            var f = new Fraction(i, i);
            expect(1).toBe(f.numerator);
            expect(1).toBe(f.denominator);
        }
    });

    it('should normalize negatives', function () {
        var f1 = new Fraction(-1, -2);
        expect(f1.numerator).toBe(1);
        expect(f1.denominator).toBe(2);

        var f2 = new Fraction(-1, 2);
        expect(f2.numerator).toBe(-1);
        expect(f2.denominator).toBe(2);

        var f3 = new Fraction(1, -2);
        expect(f3.numerator).toBe(-1);
        expect(f3.denominator).toBe(2);
    });

    it('should print and parse', function () {

        var a1 = new Fraction(3, 2);
        var a2 = a1.toString();
        var a3 = Fraction.parse(a2);
        var a4 = a3.toString();
        expect(a1.eq(a3)).toBeTruthy();
        expect(a2).toBe(a4);

        var b1 = new Fraction(1, 1);
        var b2 = b1.toString();
        var b3 = Fraction.parse(b2);
        var b4 = b3.toString();
        expect(b1.eq(b3)).toBeTruthy();
        expect(b2).toBe(b4);

        var c1 = new Fraction(1, 2);
        var c2 = c1.toString();
        var c3 = Fraction.parse(c2);
        var c4 = c3.toString();
        expect(c1.eq(c3)).toBeTruthy();
        expect(c2).toBe(c4);
    });

    it('Should round fraction to denominator', function () {

        var f1, f2, adj = new Fraction(1, 100);

        f1 = new Fraction(1, 5);
        f2 = f1.add(adj).roundTo([2, 3, 4, 5]);
        expect(f2!.eq(f1)).toBeTruthy();

        f1 = new Fraction(1, 4);
        f2 = f1.add(adj).roundTo([2, 3, 4, 5]);
        expect(f2!.eq(f1)).toBeTruthy();

        f1 = new Fraction(1, 3);
        f2 = f1.add(adj).roundTo([2, 3, 4, 5]);
        expect(f2!.eq(f1)).toBeTruthy();

        f1 = new Fraction(1, 2);
        f2 = f1.add(adj).roundTo([2, 3, 4, 5]);
        expect(f2!.eq(f1)).toBeTruthy();

        f1 = new Fraction(1, 4);
        f2 = f1.add(adj).roundTo([2, 3, 4, 5]);
        expect(f2!.eq(f1)).toBeTruthy();
    })

})
