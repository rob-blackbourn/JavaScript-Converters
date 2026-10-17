import { REPOSITORY, Fraction, Real } from '../lib'

describe('converter', () => {
  it('Should convert meters to meters.', () => {
    const meterConverter = REPOSITORY.find({ name: 'meter' })!

    const result = meterConverter.convert(1, meterConverter)

    expect(result.valueOf()).toBe(1)
  })

  it('Should convert centimeters to millimeters.', () => {
    const centimeterConverter = REPOSITORY.find({ name: 'centimeter' })!
    const millimeterConverter = REPOSITORY.find({ name: 'millimeter' })!

    const millimeters = centimeterConverter.convert(10, millimeterConverter)
    expect(millimeters.valueOf()).toBe(100)

    const centimeters = millimeterConverter.convert(100, centimeterConverter)
    expect(centimeters.valueOf()).toBe(10)
  })

  it('Should convert inches to millimeters.', () => {
    const millimeterConverter = REPOSITORY.find({ name: 'millimeter' })!
    const inchConverter = REPOSITORY.find({ system: 'imperial', name: 'inch' })!

    const millimeters = inchConverter.convert(1, millimeterConverter)

    expect(millimeters.valueOf()).toBe(25.4)
  })

  it('Should convert millimeters to inches.', () => {
    const millimeterConverter = REPOSITORY.find({ name: 'millimeter' })!
    const inchConverter = REPOSITORY.find({ system: 'imperial', name: 'inch' })!

    const inches = millimeterConverter.convert(25.4, inchConverter)
    expect(Math.abs(inches.valueOf() - 1) <= Number.EPSILON).toBeTruthy()
  })

  it('Should convert fahrenheit to celsius.', () => {
    const fahrenheitConverter = REPOSITORY.find({ name: 'Fahrenheit' })!
    const celsiusConverter = REPOSITORY.find({ name: 'Celsius' })!

    let fahrenheit = celsiusConverter.convert(0, fahrenheitConverter)
    expect(fahrenheit.valueOf()).toBe(32)

    fahrenheit = celsiusConverter.convert(100, fahrenheitConverter)
    expect(fahrenheit.valueOf()).toBe(212)

    let celsius = fahrenheitConverter.convert(32, celsiusConverter)
    expect(celsius.valueOf()).toBe(0)

    celsius = fahrenheitConverter.convert(212, celsiusConverter)
    expect(celsius.valueOf()).toBe(100)

    celsius = fahrenheitConverter.convert(-40, celsiusConverter)
    expect(celsius.valueOf()).toBe(-40)

    fahrenheit = celsiusConverter.convert(-40, fahrenheitConverter)
    expect(fahrenheit.valueOf()).toBe(-40)
  })

  it('Should convert gas mark to celsius.', () => {
    const gasMarkConverter = REPOSITORY.find({ name: 'Gas Mark' })!
    const celsiusConverter = REPOSITORY.find({ name: 'Celsius' })!

    let gasMark = celsiusConverter.convert(135, gasMarkConverter)
    expect(gasMark.valueOf()).toBe(1)

    gasMark = celsiusConverter.convert(247, gasMarkConverter)
    expect(gasMark.valueOf()).toBe(9)

    let celsius = gasMarkConverter.convert(1, celsiusConverter)
    expect(celsius.valueOf()).toBe(135)

    celsius = gasMarkConverter.convert(9, celsiusConverter)
    expect(celsius.valueOf()).toBe(247)

    celsius = gasMarkConverter.convert(new Fraction(1, 4), celsiusConverter)
    expect(celsius.valueOf()).toBe(107)

    celsius = gasMarkConverter.convert(new Fraction(1, 2), celsiusConverter)
    expect(celsius.valueOf()).toBe(121)

    gasMark = celsiusConverter.convert(107, gasMarkConverter)
    expect(gasMark.eq(new Real(new Fraction(1, 4)))).toBeTruthy()

    gasMark = celsiusConverter.convert(121, gasMarkConverter)
    expect(gasMark.eq(new Real(new Fraction(1, 2)))).toBeTruthy()
  })

  it('Should convert gas mark to fahrenheit.', () => {
    const gasMarkConverter = REPOSITORY.find({ name: 'Gas Mark' })!
    const fahrenheitConverter = REPOSITORY.find({ name: 'Fahrenheit' })!

    let gasMark, fahrenheit

    gasMark = fahrenheitConverter.convert(275, gasMarkConverter)
    expect(gasMark.valueOf()).toBe(1)

    gasMark = fahrenheitConverter.convert(475, gasMarkConverter)
    expect(gasMark.valueOf()).toBe(9)

    fahrenheit = gasMarkConverter.convert(1, fahrenheitConverter)
    expect(fahrenheit.valueOf()).toBe(275)

    fahrenheit = gasMarkConverter.convert(9, fahrenheitConverter)
    expect(fahrenheit.valueOf()).toBe(476.6)

    fahrenheit = gasMarkConverter.convert(
      new Fraction(1, 4),
      fahrenheitConverter
    )
    expect(fahrenheit.valueOf()).toBe(224.6)

    fahrenheit = gasMarkConverter.convert(
      new Fraction(1, 2),
      fahrenheitConverter
    )
    expect(fahrenheit.valueOf()).toBe(249.8)

    gasMark = fahrenheitConverter.convert(225, gasMarkConverter)
    expect(gasMark.eq(new Real(new Fraction(1, 4)))).toBeTruthy()

    gasMark = fahrenheitConverter.convert(250, gasMarkConverter)
    expect(gasMark.eq(new Real(new Fraction(1, 2)))).toBeTruthy()
  })

  it('Should convert UK cups to millilitres', () => {
    const cupConverter = REPOSITORY.find({ authority: 'UK', name: 'cup' })!
    const millilitreConverter = REPOSITORY.find({ name: 'millilitre' })!

    const millilitres = cupConverter.convert(1, millilitreConverter)
    expect(Math.round(millilitres.valueOf() * 10) / 10).toBe(284.1)
  })

  it('Should convert US Cups to grammes', () => {
    const cupConverter = REPOSITORY.find({ name: 'cup', authority: 'US' })!
    const grammeConverter = REPOSITORY.find({
      name: 'gramme',
      authority: 'si'
    })!
    const density = new Real(Fraction.fromFloat(0.875))

    const cups = REPOSITORY.convert(
      cupConverter,
      1000,
      grammeConverter,
      density
    )
    expect(cups).toBeDefined()
    expect(cups?.asFraction().roundTo([1, 2, 3, 4, 5, 6, 8])?.toString()).toBe(
      '4 1/4'
    )

    const grammes = REPOSITORY.convert(
      grammeConverter,
      cups!,
      cupConverter,
      density
    )
    expect(grammes?.valueOf()).toBe(1000)
  })
})
