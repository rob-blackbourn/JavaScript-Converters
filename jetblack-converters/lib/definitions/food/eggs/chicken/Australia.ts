import type { ConverterRepository } from '../../../../index'
import { Real, UnitConverter } from '../../../../index'

export default function (
  repository: ConverterRepository,
  domain: string,
  system: string
) {
  const authority = 'AU'

  const grammeConverter = repository.find({
    authority: 'si',
    system: 'metric',
    name: 'gramme'
  })

  const units = [
    { name: 'king size', symbol: 'king size', scalar: new Real(74) },
    { name: 'jumbo', symbol: 'jumbo', scalar: new Real(70) },
    { name: 'very large', symbol: 'XL', scalar: new Real(68.35) },
    { name: 'large', symbol: 'L', scalar: new Real(62.45) },
    { name: 'medium', symbol: 'M', scalar: new Real(45.95) }
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
