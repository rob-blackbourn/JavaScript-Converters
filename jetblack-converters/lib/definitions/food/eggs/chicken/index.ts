import type { ConverterRepository } from '../../../../index';
import australia from './Australia';
import canada from './Canada';
import europe from './Europe';
import nz from './NewZealand';
import us from './UnitedStates';

export default function (repository: ConverterRepository) {
    australia(repository);
    canada(repository);
    europe(repository);
    nz(repository);
    us(repository);
};