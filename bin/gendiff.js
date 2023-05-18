#!/usr/bin/env node
import { program } from 'commander';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import yaml from 'js-yaml';
// const fs = require('fs');

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    let object1;
    let object2;
    const getFormatOfFile = (argumentOfFile) => argumentOfFile.slice(-4);
    // Формат json
    if (getFormatOfFile(filepath1) && getFormatOfFile(filepath2) === 'json') {
      object1 = (JSON.parse(fs.readFileSync(path.resolve(filepath1))));
      object2 = (JSON.parse(fs.readFileSync(path.resolve(filepath2))));
      console.log(object1, object2);
    }
    console.log(getFormatOfFile(filepath1));
    // Формат yaml
    if (getFormatOfFile(filepath1) && getFormatOfFile(filepath2) === 'yaml') {
      object1 = yaml.load(fs.readFileSync(filepath1, 'utf8'));
      object2 = yaml.load(fs.readFileSync(filepath2, 'utf8'));
    }
    const compareFunction = (obj1, obj2) => {
      const getUniqKeysOfObjSort = _.sortBy(_.uniq(Object.keys(obj1).concat(Object.keys(obj2))));
      let result = [];
      for (let i = 0; i < getUniqKeysOfObjSort.length; i += 1) {
        console.log(getUniqKeysOfObjSort[i]);
        let str;
        const indent = ' '; // одиночный отступ
        const doubleIndent = indent + indent; // двойной отступ
        const isKeyInObj1 = getUniqKeysOfObjSort[i] in obj1;
        const isKeyInObj2 = getUniqKeysOfObjSort[i] in obj2;
        // есть в 1 нет во 2
        if ((isKeyInObj1) && !(isKeyInObj2)) {
          str = `${indent}- ${getUniqKeysOfObjSort[i]}: ${obj1[getUniqKeysOfObjSort[i]]}`;
          result.push(str);
        // есть в обоих и значения равны
        } else if ((isKeyInObj1) && (isKeyInObj2)
        && obj1[getUniqKeysOfObjSort[i]] === obj2[getUniqKeysOfObjSort[i]]) {
          str = `${doubleIndent + indent}${getUniqKeysOfObjSort[i]}: ${obj2[getUniqKeysOfObjSort[i]]}`;
          result.push(str);
        // есть в обоих и значения разные
        } else if ((isKeyInObj1) && (isKeyInObj2)
        && obj1[getUniqKeysOfObjSort[i]] != obj2[getUniqKeysOfObjSort[i]]) {
          str = `${indent}- ${getUniqKeysOfObjSort[i]}: ${obj1[getUniqKeysOfObjSort[i]]}\n${indent}+ ${getUniqKeysOfObjSort[i]}: ${obj2[getUniqKeysOfObjSort[i]]}`;
          result.push(str);
        // есть во 2 и нет в 1
        } else if (!(isKeyInObj1) && !(isKeyInObj2)) {
          str = `${indent}+ ${getUniqKeysOfObjSort[i]}: ${obj2[getUniqKeysOfObjSort[i]]}`;
          result.push(str);
        }
      }
      result = `{ \n${result.join('\n')}\n}`;
      console.log(result);
    };
    compareFunction(object1, object2);
  });
program.parse();
