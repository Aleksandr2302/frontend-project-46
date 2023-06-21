#!/usr/bin/env node
import { program } from 'commander';
import { selectFormat } from './formatters/index.js';

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
    result = selectFormat(format, filepath1, filepath2);
    console.log(result);
  });
program.parse();
