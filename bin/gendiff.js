#!/usr/bin/env node
import { program } from 'commander';

const command =(filepath1,filepath2) =>{

};
program
.name('gendiff')
.description('Compares two configuration files and shows a difference')
.version('1.0.0')
.arguments('<filepath1> <filepath2>')
.action(command)
.option('-f, --format <type>', 'output format')
program.parse();


