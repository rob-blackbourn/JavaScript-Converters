import Fraction from './fraction';

export type RealInput = number | string | Fraction | Real;
export type RealOperand = number | Fraction | Real;

class Real {
    value: number | Fraction;

    constructor(value: RealInput) {
        if (value instanceof Real) {
            this.value = value.value;
        } else if (typeof value === 'number') {
            this.value = Number.isInteger(value) ? new Fraction(value, 1) : value;
        } else if (value instanceof Fraction) {
            this.value = value.isNaN() ? Number.NaN : value;
        } else if (/^\s*[+-]?\d*\.\d+([Ee][+-]?\d+)?\s*$/.test(value)) {
            this.value = parseFloat(value);
        } else {
            const fraction = Fraction.parse(value);
            this.value = fraction.isNaN() ? Number.NaN : fraction;
        }
    }

    toString(): string { return this.value.toString(); }
    isFloat(): boolean { return typeof this.value === 'number'; }
    valueOf(): number { return this.value.valueOf(); }

    static toRealOperand(value: RealInput): RealOperand {
        return value instanceof Real
            ? value
            : (
                value instanceof Fraction
                    ? value
                    : (
                        typeof value === 'number'
                            ? value
                            : new Real(value)));
    }

    private compare(other: RealInput): number {
        const rhs = Real.toRealOperand(other);
        return this.value instanceof Fraction && rhs instanceof Fraction
            ? this.value.cmp(rhs) : this.valueOf() - rhs.valueOf();
    }
    eq(other: RealInput): boolean {
        const rhs = Real.toRealOperand(other);
        return this.value instanceof Fraction && rhs instanceof Fraction
            ? this.value.eq(rhs) : this.valueOf() === rhs.valueOf();
    }
    ne(other: RealInput): boolean { return !this.eq(other); }
    lt(other: RealInput): boolean { return this.compare(other) < 0; }
    le(other: RealInput): boolean { return this.compare(other) <= 0; }
    gt(other: RealInput): boolean { return this.compare(other) > 0; }
    ge(other: RealInput): boolean { return this.compare(other) >= 0; }

    private calculate(other: RealInput, operation: 'add' | 'sub' | 'mul' | 'div'): Real {
        const rhs = Real.toRealOperand(other);
        if (this.value instanceof Fraction && rhs instanceof Fraction) {
            return new Real(this.value[operation](rhs));
        }
        const lhs = this.valueOf();
        const value = rhs.valueOf();
        switch (operation) {
            case 'add': return new Real(lhs + value);
            case 'sub': return new Real(lhs - value);
            case 'mul': return new Real(lhs * value);
            case 'div': return new Real(lhs / value);
        }
    }

    add(other: RealInput): Real { return this.calculate(Real.toRealOperand(other), 'add'); }
    sub(other: RealInput): Real { return this.calculate(Real.toRealOperand(other), 'sub'); }
    mul(other: RealInput): Real { return this.calculate(Real.toRealOperand(other), 'mul'); }
    div(other: RealInput): Real { return this.calculate(Real.toRealOperand(other), 'div'); }
}

export default Real;
