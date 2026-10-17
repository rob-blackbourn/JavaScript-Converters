import type { ConverterRepository } from '../../../../index'
import { Real, UnitConverter } from '../../../../index'

export default function (
  repository: ConverterRepository,
  domain: string,
  system: string
) {
  const authority = 'CA'

  const grammeConverter = repository.find({
    authority: 'si',
    system: 'metric',
    name: 'gramme'
  })

  const units = [
    { name: 'jumbo', symbol: 'jumbo', scalar: new Real(70) },
    { name: 'very large', symbol: 'XL', scalar: new Real(66) },
    { name: 'large', symbol: 'L', scalar: new Real(59) },
    { name: 'medium', symbol: 'M', scalar: new Real(52) },
    { name: 'small', symbol: 'S', scalar: new Real(45) },
    { name: 'peewee', symbol: 'peewee', scalar: new Real(41) }
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
