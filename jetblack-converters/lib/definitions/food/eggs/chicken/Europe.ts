import type { ConverterRepository } from '../../../../index'
import { Real, UnitConverter } from '../../../../index'

export default function (
  repository: ConverterRepository,
  domain: string,
  system: string
) {
  const authority = 'EU'

  const grammeConverter = repository.find({
    authority: 'si',
    system: 'metric',
    name: 'gramme'
  })

  const units = [
    { name: 'very large', symbol: 'XL', scalar: new Real(73) },
    { name: 'large', symbol: 'L', scalar: new Real(68) },
    { name: 'medium', symbol: 'M', scalar: new Real(58) },
    { name: 'small', symbol: 'S', scalar: new Real(53) }
  ]

  for (const { name, symbol, scalar } of units) {
    repository.add(
      new UnitConverter(
        domain,
        system,
        authority,
        symbol,
        name,
        grammeConverter,
        value => value.mul(scalar),
        value => value.div(scalar)
      )
    )
  }
}
