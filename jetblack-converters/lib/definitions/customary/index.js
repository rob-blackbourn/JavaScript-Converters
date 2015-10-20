var length = require('./length');
var mass = require('./mass');
var volume = require('./volume');

module.exports = function (repository) {

    var system = "customary";
    var authority = "USA";

    length(repository, system, authority);
    mass(repository, system, authority);
    volume(repository, system, authority);
};