import type { ConverterRepository } from '../../index'
import { Fraction, Real, UnitConverter } from '../../index'

export default function (
  repository: ConverterRepository,
  system: string,
  authority: string
) {
  const domain = 'length'

  const meterConverter = repository.find({ name: 'meter' })

  const meterScalar = new Real(new Fraction(3048, 10000))
  const feetConverter = repository.add(
    new UnitConverter(
      domain,
      system,
      authority,
      'ft',
      'feet',
      meterConverter,
      value => value.mul(meterScalar),
      value => value.div(meterScalar)
    )
  )

  const units = [
    { name: 'thou', symbol: 'th', scalar: new Real(new Fraction(1, 12000)) },
    { name: 'inch', symbol: 'in', scalar: new Real(new Fraction(1, 12)) },
    { name: 'yard', symbol: 'yd', scalar: new Real(3) },
    { name: 'chain', symbol: 'ch', scalar: new Real(66) },
    { name: 'furlong', symbol: 'fur', scalar: new Real(660) },
    { name: 'mile', symbol: 'mi', scalar: new Real(5280) },
    { name: 'league', symbol: 'lea', scalar: new Real(15840) }
  ]

  for (const { name, symbol, scalar } of units) {
    repository.add(
      new UnitConverter(
        domain,
        system,
        authority,
        symbol,
        name,
        feetConverter,
        value => value.mul(scalar),
        value => value.div(scalar)
      )
    )
  }
}
