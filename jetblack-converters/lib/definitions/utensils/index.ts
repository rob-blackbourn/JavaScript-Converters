import type { ConverterRepository } from '../../repository';
import australia from './Australia';
import canada from './Canada';
import fda from './FDA';
import japan from './Japan';
import uk from './UK';
import usa from './USA';

export default function (repository: ConverterRepository) {
    australia(repository);
    canada(repository);
    fda(repository);
    japan(repository);
    uk(repository);
    usa(repository);
};