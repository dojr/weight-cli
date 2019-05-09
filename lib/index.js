const {
    getWeights,
    getAverage,
    getProducts,
    getTotalWeight,
} = require('./calculate');

const {
    iterative,
    recursive,
} = require('./query');

module.exports = {
    iterative,
    recursive,
    getWeights,
    getAverage,
    getProducts,
    getTotalWeight,
}