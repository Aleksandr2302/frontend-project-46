import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import yaml from 'js-yaml';
// const fs = require('fs');

// Функция для проверки сущ. ключа в объекте
const hasKey = (obj, key) => key in obj;

// Функция вывода уникальных ключей из 2-х объектов
const getUniqKeysFromObj = (obj1, obj2) => {
  const keys = Object.keys(obj1).concat(Object.keys(obj2));
  const uniqKeys = _.uniq(keys);
  const sortedKeys = _.sortBy(uniqKeys);
  return sortedKeys;
};

// Функция проверки ключей в 2-х объектах
const getKeyDiffString = (key, obj1, obj2) => {
  let str;
  switch (true) {
    // есть в 1, нет во 2
    case hasKey(obj1, key) && !hasKey(obj2, key):
      str = `  - ${key}: ${obj1[key]}`;
      break;
    // есть в обоих и значения равны
    case hasKey(obj1, key) && hasKey(obj2, key) && obj1[key] === obj2[key]:
      str = `    ${key}: ${obj2[key]}`;
      break;
    // есть в обоих и значения не равны
    case hasKey(obj1, key) && hasKey(obj2, key) && obj1[key] != obj2[key]:
      str = `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`;
      break;
    // есть во 2, нет в 1
    case !hasKey(obj1, key) && hasKey(obj2, key):
      str = `  + ${key}: ${obj2[key]}`;
      break;
    default:
      break;
  }
  return str;
};

// Функция обхода и сравнения ключей в объектах
const checkEachKeyInObj = (obj1, obj2, keys) => {
  const result = keys.map((key) => getKeyDiffString(key, obj1, obj2));
  return result;
};
// // есть в 1, нет во 2
// if (isKeyInObj1 && !isKeyInObj2) {
//   str = `  - ${key}: ${obj1[key]}`;
// // есть в обоих и значения равны
// } else if (isKeyInObj1 && isKeyInObj2 && obj1[key] === obj2[key]) {
//   str = `    ${key}: ${obj2[key]}`;
// // есть в обоих и значения не равны
// } else if (isKeyInObj1 && isKeyInObj2 && obj1[key] !== obj2[key]) {
//   str = `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`;
// // есть во 2, нет в 1
// } else if (!isKeyInObj1 && isKeyInObj2) {
//   str = `  + ${key}: ${obj2[key]}`;
// }

// Функция сравнения двух объектов
const compareFunction = (obj1, obj2) => {
  const keys = getUniqKeysFromObj(obj1, obj2);
  const result = checkEachKeyInObj(obj1, obj2, keys);
  return `{\n${result.join('\n')}\n}`;
};

// Основная функция
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
