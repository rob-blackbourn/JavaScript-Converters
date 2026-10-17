import type { ConverterRepository } from '../../../../index'
import { Real, UnitConverter } from '../../../../index'

export default function (repository: ConverterRepository) {
  const domain = 'mass'
  const system = 'food/chicken/eggs'
  const authority = 'AU'

  const grammeConverter = repository.find({
    authority: 'si',
    system: 'metric',
    name: 'gramme'
  })

  const kingSizeScalar = new Real(74)
  const jumboScalar = new Real(70)
  const veryLargeScalar = new Real(68.35)
  const largeScalar = new Real(62.45)
  const mediumScalar = new Real(45.95)

  repository.add(
    new UnitConverter(
      domain,
      system,
      authority,
      'king size',
      'king size',
      grammeConverter,
      function (value) {
        return value.mul(kingSizeScalar)
      },
      function (value) {
        return value.div(kingSizeScalar)
      }
    )
  )
  repository.add(
    new UnitConverter(
      domain,
      system,
      authority,
      'jumbo',
      'jumbo',
      grammeConverter,
      function (value) {
        return value.mul(jumboScalar)
      },
      function (value) {
        return value.div(jumboScalar)
      }
    )
  )
  repository.add(
    new UnitConverter(
      domain,
      system,
      authority,
      'XL',
      'very large',
      grammeConverter,
      function (value) {
        return value.mul(veryLargeScalar)
      },
      function (value) {
        return value.div(veryLargeScalar)
      }
    )
  )
  repository.add(
    new UnitConverter(
      domain,
      system,
      authority,
      'L',
      'large',
      grammeConverter,
      function (value) {
        return value.mul(largeScalar)
      },
      function (value) {
        return value.div(largeScalar)
      }
    )
  )
  repository.add(
    new UnitConverter(
      domain,
      system,
      authority,
      'M',
      'medium',
      grammeConverter,
      function (value) {
        return value.mul(mediumScalar)
      },
      function (value) {
        return value.div(mediumScalar)
      }
    )
  )
}
