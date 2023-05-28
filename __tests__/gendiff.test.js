// import { dirname } from 'path';
// import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { gendiffFunction } from '../src/main.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Проверка 2 плоских файла json
test('gendiffFunction  2 json', () => {
  const file1 = 'file1';
  const file2 = 'file2';
  
  const getFixturePath1 = (fileFirst) => path.join(__dirname, '..', '__fixtures__', `${fileFirst}.json`);
  const getFixturePath2 = (fileSecond) => path.join(__dirname, '..', '__fixtures__', `${fileSecond}.json`);

  // console.log(getFixturePath1(file1),getFixturePath2(file2))
  const expectedObj = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  // Проверяем результат compareFunction
  expect(gendiffFunction(getFixturePath1(file1), getFixturePath2(file2))).toEqual(expectedObj);
});

// Проверка 2 плоских файла yaml
test('gendiffFunction  2 yml', () => {
  const file1 = 'file1';
  const file2 = 'file2';

  const getFixturePath1 = (fileFirst) => path.join(__dirname, '..', '__fixtures__', `${fileFirst}.yml`);
  const getFixturePath2 = (fileSecond) => path.join(__dirname, '..', '__fixtures__', `${fileSecond}.yml`);

  // console.log(getFixturePath1(file1),getFixturePath2(file2))
  const expectedObj = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;;

  // Проверяем результат compareFunction
  expect(gendiffFunction(getFixturePath1(file1), getFixturePath2(file2))).toEqual(expectedObj);
});
