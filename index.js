#!/usr/bin/env node

const program = require('commander');
const {
    average
} = require('./commands');


const customHelp = () => {
    console.log('')
    console.log('Examples:');
    console.log('  $ weight average');
    console.log('  $ weight average "LED Televisions"');
}

program
    .version('1.0.0')
    .usage('[options] <product>')
    .command('average [product]')
    .description('Return the average of the requested product or the default of air conditioners.')
    .action(average)
    program.on('--help', () => customHelp());

    program.parse(process.argv);