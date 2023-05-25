#!/usr/bin/env node
import { program } from 'commander';
import { gendiffFunction } from '../src/main.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    console.log(gendiffFunction(filepath1, filepath2));
  });
program.parse();
