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
}

function maybeInstanceOf(value, constructor) {
    return typeof (value) === 'object' && value.constructor.name === constructor.name;
}

class Real {
    constructor(value) {

        var valueType = typeof (value);

        if (valueType === 'number') {
            if (Math.trunc(value) === value) {
                this.value = new Fraction(parseInt(value), 1);
            } else {
                this.value = value;
            }
        } else if (value instanceof Fraction) {
            if (value.isNaN()) {
                this.value = Number.NaN;
            } else {
                this.value = value;
            }
        } else {
            if (/^\s*[+-]?\d*\.\d+([Ee][+-]?\d+)?\s*$/.test(value)) {
                this.value = parseFloat(value);
            } else {
                this.value = Fraction.parse(value);
                if (this.value.isNaN()) {
                    this.value = Number.NaN;
                }
            }
        }
    }

    toString() {
        return this.value.toString();
    }

    isFloat() {
        return typeof (this.value) === 'number';
    }

    valueOf() {
        return this.value.valueOf();
    }

    eq(number) {
        return areBothRealFractions(this, number) ? this.value.eq(number.value) : this.value == number;
    }

    ne(number) {
        return areBothRealFractions(this, number) ? this.value.ne(number.value) : this.value != number;
    }


    lt(number) {
        return areBothRealFractions(this, number) ? this.value.lt(number.value) : this.value < number;
    }

    le(number) {
        return areBothRealFractions(this, number) ? this.value.le(number.value) : this.value <= number;
    }

    gt(number) {
        return areBothRealFractions(this, number) ? this.value.gt(number.value) : this.value > number;
    }

    ge(number) {
        return areBothRealFractions(this, number) ? this.value.ge(number.value) : this.value >= number;
    }

    add(number) {
        return new Real(areBothRealFractions(this, number) ? this.value.add(number.value) : this.value + number);
    }

    sub(number) {
        return new Real(areBothRealFractions(this, number) ? this.value.sub(number.value) : this.value - number);
    }

    mul(number) {
        return new Real(areBothRealFractions(this, number) ? this.value.mul(number.value) : this.value * number);
    }

    div(number) {
        return new Real(areBothRealFractions(this, number) ? this.value.div(number.value) : this.value / number);
    }
}

function areBothRealFractions(lhs, rhs) {
    return lhs instanceof Real && rhs instanceof Real && lhs.value instanceof Fraction && rhs.value instanceof Fraction;
}

module.exports = {
    Real: Real,
    Fraction: Fraction
};
