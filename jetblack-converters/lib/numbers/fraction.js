"use strict";

/**
 * Creates an instance of a Fraction.
 * 
 * @constructor
 * @this {Fraction}
 * @param {number} numerator The numerator of the fraction.
 * @param {number} denominator The denominator of the fraction.
 * 
 * @property {number} numerator The numerator of the fraction.
 */
class Fraction {
    constructor(numerator, denominator) {
        if (Math.trunc(numerator) == numerator && Math.trunc(denominator) == denominator) {
            this._numerator = numerator;
            this._denominator = denominator;
            Fraction.simplify(this);
        } else {
            this._numerator = 1;
            this._denominator = 0;
        }
    }

    get numerator() {
        return this._numerator;
    }

    get denominator() {
        return this._denominator;
    }

    static gcd(a, b) {
        if (b == 0) {
            return a;
        } else {
            return Fraction.gcd(b, a % b);
        }
    }

    static simplify(fraction) {
        if (fraction._denominator == 0) {
            fraction._numerator = 1;
            fraction._denominator = 0;
        } else if (fraction._numerator === 0) {
            fraction._denominator = 1;
        } else {
            var factor = Fraction.gcd(fraction._numerator, fraction._denominator);
            fraction._numerator /= factor;
            fraction._denominator /= factor;

            if (fraction._denominator < 0) {
                fraction._numerator = -fraction.numerator;
                fraction._denominator = -fraction.denominator;
            }
        }
    }

    static parse(s) {
        var result, whole, numerator, denominator;
        if ((result = /^\s*([+-]?\d+)\s+(\d+)\s*\/\s*(\d+)\s*$/.exec(s))) {
            // Fraction with whole part
            whole = parseInt(result[1]);
            numerator = parseInt(result[2]);
            denominator = parseInt(result[3]);
        } else if ((result = /^\s*([+-]?\d+)\s*\/\s*(\d+)\s*$/.exec(s))) {
            // Fraction
            whole = 0;
            numerator = parseInt(result[1]);
            denominator = parseInt(result[2]);
        } else if ((result = /^\s*([+-]?\d+)\s*$/.exec(s))) {
            // Whole
            whole = 0;
            numerator = parseInt(result[1]);
            denominator = 1;
        } else {
            return new Fraction();
        }

        return new Fraction(numerator + whole * denominator, denominator);
    }

    toString() {
        if (this._denominator == 0) {
            return Number.NaN.toString();
        }

        var whole = Math.trunc(this._numerator / this._denominator);
        if (whole) {
            var numerator = this._numerator - whole * this._denominator;
            if (numerator == 0) {
                return whole.toString();
            } else {
                return whole + " " + numerator + "/" + this._denominator;
            }
        } else {
            return this._numerator + "/" + this._denominator;
        }
    }

    valueOf() {
        return this._denominator === 0 ? Number.NaN : this._numerator / this._denominator;
    }

    cmp(value) {
        return (this._numerator * value.denominator) - (value.numerator * this._denominator);
    }

    eq(value) {
        return this.cmp(value) === 0;
    }

    ne(value) {
        return !this.eq(value);
    }

    lt(value) {
        return this.cmp(value) < 0;
    }

    le(value) {
        return this.cmp(value) <= 0;
    }

    gt(value) {
        return this.cmp(value) > 0;
    }

    ge(value) {
        return this.cmp(value) >= 0;
    }

    add(value) {
        return new Fraction((this._numerator * value.denominator) + (value.numerator * this._denominator), this._denominator * value.denominator);
    }

    sub(value) {
        return new Fraction((this._numerator * value.denominator) - (value.numerator * this._denominator), this._denominator * value.denominator);
    }

    mul(value) {
        return new Fraction(this._numerator * value.numerator, this._denominator * value.denominator);
    }

    div(value) {
        return new Fraction(this._numerator * value.denominator, this._denominator * value.numerator);
    }

    abs(value) {
        if (this._numerator >= 0) {
            return this;
        } else {
            return new Fraction(-this._numerator, this._denominator);
        }
    }

    isNaN() {
        return this._denominator == 0;
    }

    static fromFloat(x, tolerance) {
        if (!tolerance)
            tolerance = 1.0E-6;

        var h1 = 1, h2 = 0, k1 = 0, k2 = 1;
        var b = x;
        do {
            var a = Math.floor(b);
            var aux = h1;
            h1 = a * h1 + h2;
            h2 = aux;
            aux = k1;
            k1 = a * k1 + k2;
            k2 = aux;
            b = 1 / (b - a);
        } while (Math.abs(x - h1 / k1) > x * tolerance);

        return new Fraction(Math.trunc(h1), Math.trunc(k1));
    }

    roundTo(denominators) {
        var min = new Fraction(1, 1);
        var best = null;
        for (let denominator of denominators) {
            var a = this.numerator * denominator;
            var b = this.denominator * denominator;
            var c = Math.round(a / this.denominator);
            var f = new Fraction(c, denominator);
            var error = f.sub(this).abs();
            if (error.lt(min)) {
                best = f;
                min = error;
            }
        }
        return best;
    }
}

module.exports = Fraction;
