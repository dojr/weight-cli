const _ = require('lodash');
const {
    getWeights,
    getAverage,
    getProducts,
    getTotalWeight,
} = require('../../lib');
const {
    test_data: products,
    air_conditioners: airConditionerFixture,
} = require('../fixtures/');

test('should return air conditioners', () => {
    const airConditioners = getProducts(products, 'Air Conditioners');
    expect(airConditioners).toStrictEqual(airConditionerFixture);
});

test('should return weights of given products', () => {
    const airConditioners = getProducts(products, 'Air Conditioners');
    const weights = getWeights(airConditioners);

    expect(weights).toStrictEqual([
        0.8450000000000002,
        42.709320000000005,
        61.39546875000001,
        61.50375,
    ])
});

test('should return total weights of products together', () => {
    const airConditioners = getProducts(products, 'Air Conditioners');
    const weights = getWeights(airConditioners);
    const totalWeights = getTotalWeight(weights);

    expect(totalWeights).toBe(166.45353875);
});

test('should return average of the products', () => {
    const airConditioners = getProducts(products, 'Air Conditioners');
    const weights = getWeights(airConditioners);
    const totalWeights = getTotalWeight(weights);
    const average = getAverage(totalWeights, _.size(airConditioners));

    expect(average).toBe(41.6133846875);
});