﻿var UnitConverter = require('../../unit-converter');

var numbers = require('../../numbers'),
    Fraction = numbers.Fraction,
    Real = numbers.Real;

module.exports = function (repository) {

    var litreConverter = repository.find({ name: 'litre' });

    var teaspoonScalar = new Real(new Fraction(5, 1000));
    repository.add(new UnitConverter("volume", "utensils", "FDA", "tsp", "teaspoon", litreConverter,
        function (value) {
            return value.mul(teaspoonScalar);
        }, function (value) {
            return value.div(teaspoonScalar);
        }));

    var tablespoonScalar = new Real(new Fraction(15, 1000));
    repository.add(new UnitConverter("volume", "utensils", "FDA", "tbsp", "tablespoon", litreConverter,
        function (value) {
            return value.mul(tablespoonScalar);
        }, function (value) {
            return value.div(tablespoonScalar);
        }));

    var cupScalar = new Real(new Fraction(240, 1000));
    repository.add(new UnitConverter("volume", "utensils", "FDA", "cup", "cup", litreConverter,
        function (value) {
            return value.mul(cupScalar);
        }, function (value) {
            return value.div(cupScalar);
        }));
};