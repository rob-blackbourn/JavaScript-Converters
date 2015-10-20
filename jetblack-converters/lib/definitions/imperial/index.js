var length = require('./length');
var mass = require('./mass');
var volume = require('./volume');

module.exports = function (repository) {

    var system = "imperial";
    var authority = "UK";

    length(repository, system, authority);
    mass(repository, system, authority);
    volume(repository, system, authority);
};