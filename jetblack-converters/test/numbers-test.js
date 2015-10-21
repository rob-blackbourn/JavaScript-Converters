var assert = require('assert');

var numbers = require('../lib/numbers'),
    Fraction = numbers.Fraction,
    Real = numbers.Real;

describe('numbers', function () {

    it('Should construct a simple fraction', function () {

        var f1 = new Fraction(1, 2);
        assert.equal(f1.numerator, 1, "The numerator should be 1");
        assert.equal(f1.denominator, 2, "The denominator should be 2");
    })

    it('Should simplify.', function () {

        var f1 = new Fraction(2, 4);
        assert.equal(f1.numerator, 1, "The numerator should be 1");
        assert.equal(f1.denominator, 2, "The denominator should be 2");
    })

    it('should return NaN', function () {
        var f = new Fraction(1, 0);
        assert.ok(f.isNaN());
    });

    it('should return construct fractions of value 1', function () {
        for (var i = 1; i <= 10; ++i) {
            var f = new Fraction(i, i);
            assert.equal(1, f.numerator);
            assert.equal(1, f.denominator);
        }
    });

    it('should normalise negatives', function () {
        var f1 = new Fraction(-1, -2);
        assert.equal(f1.numerator, 1, "If both the numerator and denominator are negative the numerator should become positive.");
        assert.equal(f1.denominator, 2, "If both the numerator and denominator are negative the denominator should become positive.");

        var f2 = new Fraction(-1, 2);
        assert.equal(f2.numerator, -1, "If the numerator is negative and the denominator is positive the numerator should stay negative.");
        assert.equal(f2.denominator, 2, "If the numerator is negative and the denominator is positive the denominator should stay postitive.");

        var f3 = new Fraction(1, -2);
        assert.equal(f3.numerator, -1, "If the numerator is positive and the denominator is negative the numerator should become negative.");
        assert.equal(f3.denominator, 2, "If the numerator is positive and the denominator is negative the numerator should become postive.");
    });

    it('should print and parse', function () {

        var a1 = new Fraction(3, 2);
        var a2 = a1.toString();
        var a3 = Fraction.parse(a2);
        var a4 = a3.toString();
        assert.ok(a1.eq(a3), "Should print and parse back a top heavy fraction.");
        assert.equal(a2, a4, "The print representation of a top heavy fraction shouldn't change.");

        var b1 = new Fraction(1, 1);
        var b2 = b1.toString();
        var b3 = Fraction.parse(b2);
        var b4 = b3.toString();
        assert.ok(b1.eq(b3), "Should print and parse back a whole number fraction.");
        assert.equal(b2, b4, "The print representation of a whole number fraction shouldn't change.");

        var c1 = new Fraction(1, 2);
        var c2 = c1.toString();
        var c3 = Fraction.parse(c2);
        var c4 = c3.toString();
        assert.ok(c1.eq(c3), "Should print and parse back a fraction.");
        assert.equal(c2, c4, "The print representation of a fraction shouldn't change.");
    });

    it('Should round fraction to denominator', function () {

        var f1, f2, adj = new Fraction(1, 100);

        f1 = new Fraction(1, 5);
        f2 = f1.add(adj).roundTo([2, 3, 4, 5]);
        assert.ok(f2.eq(f1));

        f1 = new Fraction(1, 4);
        f2 = f1.add(adj).roundTo([2, 3, 4, 5]);
        assert.ok(f2.eq(f1));

        f1 = new Fraction(1, 3);
        f2 = f1.add(adj).roundTo([2, 3, 4, 5]);
        assert.ok(f2.eq(f1));

        f1 = new Fraction(1, 2);
        f2 = f1.add(adj).roundTo([2, 3, 4, 5]);
        assert.ok(f2.eq(f1));

        f1 = new Fraction(1, 4);
        f2 = f1.add(adj).roundTo([2, 3, 4, 5]);
        assert.ok(f2.eq(f1));
    })

})
