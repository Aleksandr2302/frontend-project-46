// import { dirname } from 'path';
// import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import formatDiffStylishDefault from '../bin/stylish.js';
import { gendiffFunction } from '../src/main.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Проверка 2 плоских файла json
test('gendiffFunction  2 flat json', () => {
  const file1 = 'file1';
  const file2 = 'file2';

  const getFixturePath1 = (fileFirst) => path.join(__dirname, '..', '__fixtures__', `${fileFirst}.json`);
  const getFixturePath2 = (fileSecond) => path.join(__dirname, '..', '__fixtures__', `${fileSecond}.json`);

  const resultOfGenDiffFunc = gendiffFunction(getFixturePath1(file1), getFixturePath2(file2));

  // console.log(getFixturePath1(file1),getFixturePath2(file2))
  const expectedObj = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  // Проверяем результат gendiffFunction для плоских файлов
  expect(formatDiffStylishDefault(resultOfGenDiffFunc)).toEqual(expectedObj);
});

// Проверка 2 плоских файла yaml
test('gendiffFunction  2 flat yml', () => {
  const file1 = 'file1';
  const file2 = 'file2';

  const getFixturePath1 = (fileFirst) => path.join(__dirname, '..', '__fixtures__', `${fileFirst}.yml`);
  const getFixturePath2 = (fileSecond) => path.join(__dirname, '..', '__fixtures__', `${fileSecond}.yml`);

  const resultOfGenDiffFunc = gendiffFunction(getFixturePath1(file1), getFixturePath2(file2));
  // console.log(getFixturePath1(file1),getFixturePath2(file2))
  const expectedObj = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  expect(formatDiffStylishDefault(resultOfGenDiffFunc)).toEqual(expectedObj);
});

// Проверка 2 вложенных файла json
test('gendiffFunction  2 nested json', () => {
  const file3 = 'file3';
  const file4 = 'file4';

  const getFixturePath1 = (fileFirst) => path.join(__dirname, '..', '__fixtures__', `${fileFirst}.json`);
  const getFixturePath2 = (fileSecond) => path.join(__dirname, '..', '__fixtures__', `${fileSecond}.json`);

  const resultOfGenDiffFunc = gendiffFunction(getFixturePath1(file3), getFixturePath2(file4));
  // console.log(getFixturePath1(file1),getFixturePath2(file2))
  const expectedObj = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

  // Проверяем результат gendiffFunction для вложенных файлов
  expect(formatDiffStylishDefault(resultOfGenDiffFunc)).toEqual(expectedObj);
});

// Проверка 2 вложенных файла yaml
test('gendiffFunction  2 nested yml', () => {
  const file3 = 'file3';
  const file4 = 'file4';

  const getFixturePath1 = (fileFirst) => path.join(__dirname, '..', '__fixtures__', `${fileFirst}.yaml`);
  const getFixturePath2 = (fileSecond) => path.join(__dirname, '..', '__fixtures__', `${fileSecond}.yaml`);

  const resultOfGenDiffFunc = gendiffFunction(getFixturePath1(file3), getFixturePath2(file4));
  // console.log(getFixturePath1(file1),getFixturePath2(file2))
  const expectedObj = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

  expect(formatDiffStylishDefault(resultOfGenDiffFunc)).toEqual(expectedObj);
});
