import type { ConverterRepository } from '../../index'
import { Fraction, Real, UnitConverter } from '../../index'

export default function (
  repository: ConverterRepository,
  system: string,
  authority: string
) {
  const domain = 'volume'

  const litreConverter = repository.find({ name: 'litre' })
  const litreScalar = new Real(new Fraction(4732, 10000))
  const pintConverter = repository.add(
    new UnitConverter(
      domain,
      system,
      authority,
      'pt',
      'pint',
      litreConverter,
      pint => pint.mul(litreScalar),
      litre => litre.div(litreScalar)
    )
  )

  const units = [
    { name: 'minim', symbol: 'min', scalar: new Real(new Fraction(1, 9600)) },
    {
      name: 'fluid dram',
      symbol: 'fl dr',
      scalar: new Real(new Fraction(1, 160))
    },
    {
      name: 'fluid ounce',
      symbol: 'fl oz',
      scalar: new Real(new Fraction(1, 16))
    },
    { name: 'quart', symbol: 'qt', scalar: new Real(2) },
    { name: 'gallon', symbol: 'gal', scalar: new Real(8) }
  ]

  for (const { name, symbol, scalar } of units) {
    repository.add(
      new UnitConverter(
        domain,
        system,
        authority,
        symbol,
        name,
        pintConverter,
        pint => pint.mul(scalar),
        gallon => gallon.div(scalar)
      )
    )
  }
}
