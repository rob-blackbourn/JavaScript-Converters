import type { ConverterRepository } from '../../index';
import australia from './Australia';
import canada from './Canada';
import fda from './FDA';
import japan from './Japan';
import uk from './UnitedKingdom';
import us from './UnitedStates';

export default function (repository: ConverterRepository) {
    australia(repository);
    canada(repository);
    fda(repository);
    japan(repository);
    uk(repository);
    us(repository);
};