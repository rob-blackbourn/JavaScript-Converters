import type { ConverterRepository } from '../../index'
import { Fraction, Real, UnitConverter } from '../../index'

export default function (
  repository: ConverterRepository,
  system: string,
  authority: string
) {
  const domain = 'mass'

  const grammeConverter = repository.find({ name: 'gramme' })
  const grammeScalar = new Real(new Fraction(45359237, 100000))
  const poundConverter = repository.add(
    new UnitConverter(
      domain,
      system,
      authority,
      'lb',
      'pound',
      grammeConverter,
      pound => pound.mul(grammeScalar),
      gramme => gramme.div(grammeScalar)
    )
  )

  const units = [
    { name: 'grain', symbol: 'gr', scalar: new Real(new Fraction(1, 7000)) },
    { name: 'drachm', symbol: 'dr', scalar: new Real(new Fraction(1, 256)) },
    { name: 'ounce', symbol: 'oz', scalar: new Real(new Fraction(1, 16)) },
    { name: 'stone', symbol: 'st', scalar: new Real(14) },
    { name: 'quarter', symbol: 'qtr', scalar: new Real(28) },
    { name: 'hundredweight', symbol: 'cwt', scalar: new Real(112) },
    { name: 'ton', symbol: 'tn', scalar: new Real(2240) }
  ]

  for (const { name, symbol, scalar } of units) {
    repository.add(
      new UnitConverter(
        domain,
        system,
        authority,
        symbol,
        name,
        poundConverter,
        value => value.mul(scalar),
        value => value.div(scalar)
      )
    )
  }
}
