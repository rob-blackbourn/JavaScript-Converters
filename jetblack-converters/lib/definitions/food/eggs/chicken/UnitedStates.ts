import type { ConverterRepository } from '../../../../index'
import { Fraction, Real, UnitConverter } from '../../../../index'

export default function (
  repository: ConverterRepository,
  domain: string,
  system: string
) {
  const authority = 'US'

  const ounceConverter = repository.find({
    authority: authority,
    system: 'customary',
    name: 'ounce'
  })

  const units = [
    { name: 'jumbo', symbol: 'jumbo', scalar: new Real(new Fraction(5, 2)) },
    { name: 'very large', symbol: 'XL', scalar: new Real(new Fraction(9, 4)) },
    { name: 'large', symbol: 'L', scalar: new Real(2) },
    { name: 'medium', symbol: 'M', scalar: new Real(new Fraction(7, 4)) },
    { name: 'small', symbol: 'S', scalar: new Real(new Fraction(3, 2)) },
    { name: 'peewee', symbol: 'peewee', scalar: new Real(new Fraction(5, 4)) }
  ]

  for (const { name, symbol, scalar } of units) {
    repository.add(
      new UnitConverter(
        domain,
        system,
        authority,
        symbol,
        name,
        ounceConverter,
        value => value.mul(scalar),
        value => value.div(scalar)
      )
    )
  }
}
