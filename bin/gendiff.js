#!/usr/bin/env node
import { program } from 'commander';
import formatDiffStylishDefault from './stylish.js';
import { gendiffFunction } from '../src/main.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format (default "stylish")')
  .action((filepath1, filepath2) => {
    const options = program.opts();
    const format = options.format ? options.format : 'stylish';
    let result = '';
    const resultOfGendiffFunc = gendiffFunction(filepath1, filepath2);
    if (format === 'stylish') {
      result = formatDiffStylishDefault(resultOfGendiffFunc);
    } else if (format === 'plain') {
      result = 'plain!!!';
    }
    console.log(result);
  });
program.parse();
