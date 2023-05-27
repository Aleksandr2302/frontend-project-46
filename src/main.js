import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import yaml from 'js-yaml';
// const fs = require('fs');

// Функция для проверки сущ. ключа в объекте
const hasKey = (obj, key) => key in obj;

// Функция вывода уникальных ключей из объектов
const getUniqKeysFromObj = (obj1, obj2) => {
  const keys = Object.keys(obj1).concat(Object.keys(obj2));
  const uniqKeys = _.uniq(keys);
  const sortedKeys = _.sortBy(uniqKeys);
  return sortedKeys;
};

const compareFunction = (obj1, obj2) => {
  const keys = getUniqKeysFromObj(obj1, obj2);
  const result = keys.map((key) => {
    let str;
    const isKeyInObj1 = hasKey(obj1, key);
    const isKeyInObj2 = hasKey(obj2, key);
    // есть в 1 нет во 2
    if (isKeyInObj1 && !isKeyInObj2) {
      str = `  - ${key}: ${obj1[key]}`;
    // есть в обоих и значения равны
    } else if (isKeyInObj1 && isKeyInObj2 && obj1[key] === obj2[key]) {
      str = `    ${key}: ${obj2[key]}`;
    // есть в обоих и значения не равны
    } else if (isKeyInObj1 && isKeyInObj2 && obj1[key] !== obj2[key]) {
      str = `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`;
    // есть во 2 и нет в 1
    } else if (!isKeyInObj1 && isKeyInObj2) {
      str = `  + ${key}: ${obj2[key]}`;
    }
    return str;
  });
  return `{\n${result.join('\n')}\n}`;
};

const gendiffFunction = ((filepath1, filepath2) => {
  let object1;
  let object2;
  const getFormatOfFile = (argumentOfFile) => argumentOfFile.slice(-4);
  // Формат json
  if (getFormatOfFile(filepath1) && getFormatOfFile(filepath2) === 'json') {
    object1 = (JSON.parse(fs.readFileSync(path.resolve(filepath1))));
    object2 = (JSON.parse(fs.readFileSync(path.resolve(filepath2))));
    // console.log(object1, object2);
  }
  // console.log(getFormatOfFile(filepath1));
  // Формат yaml
  if (getFormatOfFile(filepath1) && getFormatOfFile(filepath2) === 'yaml') {
    object1 = yaml.load(fs.readFileSync(filepath1, 'utf8'));
    object2 = yaml.load(fs.readFileSync(filepath2, 'utf8'));
  }

  const result = compareFunction(object1, object2);
  return result;
});

export { gendiffFunction, compareFunction };
