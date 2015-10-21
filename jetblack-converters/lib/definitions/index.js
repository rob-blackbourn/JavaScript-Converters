var metric = require('./metric'),
    imperial = require('./imperial'),
    customary = require('./customary'),
    temperature = require('./temperature'),
    utensils = require('./utensils'),
    food = require('./food');

module.exports = function (repository) {
    metric(repository);
    imperial(repository);
    customary(repository);
    temperature(repository);
    utensils(repository);
    food(repository);
};