"use strict";

var Fraction = require('./fraction');

class Real {
    constructor(value) {

        var valueType = typeof (value);

        if (valueType === 'number') {
            if (Number.isInteger(value)) {
                this.value = new Fraction(value, 1);
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

module.exports = Real;
