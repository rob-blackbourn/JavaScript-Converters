var australia = require('./Australia'),
    canada = require('./Canada'),
    europe = require('./Europe'),
    nz = require('./NewZealand'),
    usa = require('./USA');

module.exports = function (repository) {
    australia(repository);
    canada(repository);
    europe(repository);
    nz(repository);
    usa(repository);
};