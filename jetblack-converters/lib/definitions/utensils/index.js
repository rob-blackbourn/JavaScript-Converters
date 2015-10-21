var australia = require('./Australia'),
    canada = require('./Canada'),
    fda = require('./FDA'),
    japan = require('./Japan'),
    uk = require('./UK'),
    usa = require('./USA');

module.exports = function (repository) {
    australia(repository);
    canada(repository);
    fda(repository);
    japan(repository);
    uk(repository);
    usa(repository);
};