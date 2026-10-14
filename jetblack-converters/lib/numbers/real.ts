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

    private compare(other: RealOperand): number {
        const rhs = other instanceof Real ? other.value : other;
        return this.value instanceof Fraction && rhs instanceof Fraction
            ? this.value.cmp(rhs) : this.valueOf() - rhs.valueOf();
    }
    eq(other: RealOperand): boolean {
        const rhs = other instanceof Real ? other.value : other;
        return this.value instanceof Fraction && rhs instanceof Fraction
            ? this.value.eq(rhs) : this.valueOf() === rhs.valueOf();
    }
    ne(other: RealOperand): boolean { return !this.eq(other); }
    lt(other: RealOperand): boolean { return this.compare(other) < 0; }
    le(other: RealOperand): boolean { return this.compare(other) <= 0; }
    gt(other: RealOperand): boolean { return this.compare(other) > 0; }
    ge(other: RealOperand): boolean { return this.compare(other) >= 0; }

    private calculate(other: RealOperand, operation: 'add' | 'sub' | 'mul' | 'div'): Real {
        const rhs = other instanceof Real ? other.value : other;
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
    add(other: RealOperand): Real { return this.calculate(other, 'add'); }
    sub(other: RealOperand): Real { return this.calculate(other, 'sub'); }
    mul(other: RealOperand): Real { return this.calculate(other, 'mul'); }
    div(other: RealOperand): Real { return this.calculate(other, 'div'); }
}

export default Real;
