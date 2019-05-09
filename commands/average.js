const _ = require('lodash');
const CLI = require('clui');
const chalk = require('chalk');
const {
    iterative,
    getWeights,
    getAverage,
    getProducts,
    getTotalWeight,
} = require('../lib');

const Spinner = CLI.Spinner;

const calculateAverage = (data, product) => {
    const airConditioners = getProducts(data, product);
    const weights = getWeights(airConditioners);
    const totalWeights = getTotalWeight(weights);

    return getAverage(totalWeights, _.size(airConditioners));
}

const api = 'http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com';

module.exports = async product => {
    if (_.isUndefined(product)) {
        product = 'Air Conditioners';
    }

    const status = new Spinner(`Requesting ${product} and calculating average...`);
    let data;

    status.start();
    
    try {
        data = await iterative(api);
    } catch (err) {
        console.error(`Something went wrong when trying to get ${product}: ${err}`);
        process.exit(1);
    } finally {
        status.stop();
    }

    const average = calculateAverage(data, product);
    console.log(chalk.keyword('orange').bold(`
        Average cubic weight of the ${product} is ${average.toFixed(2)}kg
    `));
}