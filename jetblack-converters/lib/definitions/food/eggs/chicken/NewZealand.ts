import type { ConverterRepository } from '../../../../index'
import { Real, UnitConverter } from '../../../../index'

export default function (
  repository: ConverterRepository,
  domain: string,
  system: string
) {
  const authority = 'NZ'

  const grammeConverter = repository.find({
    authority: 'si',
    system: 'metric',
    name: 'gramme'
  })

  const units = [
    { name: 'jumbo', symbol: 'size 8', scalar: new Real(68) },
    { name: 'large', symbol: 'size 7', scalar: new Real(53) },
    { name: 'standard', symbol: 'size 6', scalar: new Real(53) },
    { name: 'medium', symbol: 'size 5', scalar: new Real(44) },
    { name: 'small', symbol: 'size 4', scalar: new Real(35) }
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
