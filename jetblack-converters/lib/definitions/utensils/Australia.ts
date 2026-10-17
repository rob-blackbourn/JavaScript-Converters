import type { ConverterRepository } from '../../index'
import { Fraction, Real, UnitConverter } from '../../index'

export default function (
  repository: ConverterRepository,
  domain: string,
  system: string
) {
  const authority = 'AU'
  const litreConverter = repository.find({ name: 'litre' })

  const units = [
    {
      name: 'teaspoon',
      symbol: 'tsp',
      scalar: new Real(new Fraction(5, 1000))
    },
    {
      name: 'dessertspoon',
      symbol: 'dstspn',
      scalar: new Real(new Fraction(10, 1000))
    },
    {
      name: 'tablespoon',
      symbol: 'tbsp',
      scalar: new Real(new Fraction(20, 1000))
    },
    { name: 'cup', symbol: 'cup', scalar: new Real(new Fraction(250, 1000)) }
  ]

  for (const { name, symbol, scalar } of units) {
    repository.add(
      new UnitConverter(
        domain,
        system,
        authority,
        symbol,
        name,
        litreConverter,
        value => value.mul(scalar),
        value => value.div(scalar)
      )
    )
  }
}
