const _ = require('lodash');

const getProducts = (data, product) => _.filter(data, (d) => d.category === product);

// get the weights of each object and chain with compact so that
// undefined objects are thrown out such as the items with no
// dimensions
const getWeights = data => _.compact(_.map(data, (obj, acc) => {
    // Using get in lodash to find the dimensions otherwise returning null.
    // Could be improved to break as soon as one of them is null which would
    // tell us that it is not a physical object or has no weight.
    const width = _.get(obj, 'size.width', null);
    const length = _.get(obj, 'size.length', null);
    const height = _.get(obj, 'size.height', null);

    if (width !== null || length !== null || height !== null) {
        // Assuming all data comes in as cm and we need to convert to meters
        const widthToMeters = parseFloat(width / 100);
        const lengthToMeters = parseFloat(length / 100);
        const heightToMeters = parseFloat(height / 100);

        const cubicMeters = parseFloat(widthToMeters * lengthToMeters * heightToMeters)

        return parseFloat(cubicMeters * 250);
    } 
}));

// pure function to find the total size given the weights we calculated earlier.
const getTotalWeight = weights =>  _.reduce(weights, (prev, acc) => {
    return prev + acc;
}, parseFloat(0));


const getAverage = (total, size) => parseFloat(total / size);

module.exports = {
    getWeights,
    getAverage,
    getProducts,
    getTotalWeight,
}