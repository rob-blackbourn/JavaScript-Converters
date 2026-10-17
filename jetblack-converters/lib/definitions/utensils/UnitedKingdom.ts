import type { ConverterRepository } from '../../index'
import { Fraction, Real, UnitConverter } from '../../index'

export default function (
  repository: ConverterRepository,
  domain: string,
  system: string
) {
  const authority = 'UK'

  const litreConverter = repository.find({ system: 'metric', name: 'litre' })
  const pintConverter = repository.find({ system: 'imperial', name: 'pint' })

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
      scalar: new Real(new Fraction(15, 1000))
    }
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

  const cupScalar = new Real(2)
  repository.add(
    new UnitConverter(
      domain,
      system,
      authority,
      'cup',
      'cup',
      pintConverter,
      value => value.div(cupScalar),
      value => value.mul(cupScalar)
    )
  )
}
