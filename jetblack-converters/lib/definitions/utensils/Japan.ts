import type { ConverterRepository } from '../../index'
import { Fraction, Real, UnitConverter } from '../../index'

export default function (
  repository: ConverterRepository,
  domain: string,
  system: string
) {
  const authority = 'JP'

  const litreConverter = repository.find({ name: 'litre' })

  const units = [
    { name: 'go', symbol: 'go', scalar: new Real(new Fraction(2401, 133100)) },
    { name: 'cup', symbol: 'cup', scalar: new Real(new Fraction(200, 1000)) }
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
