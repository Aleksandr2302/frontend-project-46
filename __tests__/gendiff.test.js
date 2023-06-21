// import { dirname } from 'path';
// import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import formatStylish from '../bin/formatters/stylish.js';
import formatPlain from '../bin/formatters/plain.js';
import { gendiffFunction } from '../src/main.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 4 Проверки в формате stylish //
// Проверка 2 плоских файла json в формате stylish
test('gendiffFunction 2 flat json in stylish format', () => {
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
  expect(formatStylish(resultOfGenDiffFunc)).toEqual(expectedObj);
});

// Проверка 2 плоских файла yaml в формате stylish
test('gendiffFunction 2 flat yml in stylish format', () => {
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

  expect(formatStylish(resultOfGenDiffFunc)).toEqual(expectedObj);
});

// Проверка 2 вложенных файла json в формате stylish
test('gendiffFunction 2 nested json in stylish format', () => {
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

  expect(formatStylish(resultOfGenDiffFunc)).toEqual(expectedObj);
});

// Проверка 2 вложенных файла yaml в формате stylish
test('gendiffFunction  2 nested yml in stylish format', () => {
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

  expect(formatStylish(resultOfGenDiffFunc)).toEqual(expectedObj);
});

// 4 Проверки в формате plain
// Проверка 2 плоских файла json в формате plain
test('gendiffFunction 2 flat json in plain format', () => {
  const file1 = 'file1';
  const file2 = 'file2';

  const getFixturePath1 = (fileFirst) => path.join(__dirname, '..', '__fixtures__', `${fileFirst}.json`);
  const getFixturePath2 = (fileSecond) => path.join(__dirname, '..', '__fixtures__', `${fileSecond}.json`);

  const resultOfGenDiffFunc = gendiffFunction(getFixturePath1(file1), getFixturePath2(file2));

  // console.log(getFixturePath1(file1),getFixturePath2(file2))
  const expectedObj = `  Property 'follow' was removed
  Property 'proxy' was removed
  Property 'timeout' was updated. From 50 to 20
  Property 'verbose' was added with value: true`;

  // Проверяем результат gendiffFunction для плоских файлов
  expect(formatPlain(resultOfGenDiffFunc)).toEqual(expectedObj);
});

// Проверка 2 плоских файла yaml в формате plain
test('gendiffFunction 2 flat yml in plain format', () => {
  const file1 = 'file1';
  const file2 = 'file2';

  const getFixturePath1 = (fileFirst) => path.join(__dirname, '..', '__fixtures__', `${fileFirst}.yml`);
  const getFixturePath2 = (fileSecond) => path.join(__dirname, '..', '__fixtures__', `${fileSecond}.yml`);

  const resultOfGenDiffFunc = gendiffFunction(getFixturePath1(file1), getFixturePath2(file2));

  // console.log(getFixturePath1(file1),getFixturePath2(file2))
  const expectedObj = `  Property 'follow' was removed
  Property 'proxy' was removed
  Property 'timeout' was updated. From 50 to 20
  Property 'verbose' was added with value: true`;

  // Проверяем результат gendiffFunction для плоских файлов
  expect(formatPlain(resultOfGenDiffFunc)).toEqual(expectedObj);
});

// Проверка 2 вложенных файла yaml в формате plain

test('gendiffFunction  2 nested yml in plain format', () => {
  const file3 = 'file3';
  const file4 = 'file4';

  const getFixturePath1 = (fileFirst) => path.join(__dirname, '..', '__fixtures__', `${fileFirst}.yaml`);
  const getFixturePath2 = (fileSecond) => path.join(__dirname, '..', '__fixtures__', `${fileSecond}.yaml`);

  const resultOfGenDiffFunc = gendiffFunction(getFixturePath1(file3), getFixturePath2(file4));
  // console.log(getFixturePath1(file1),getFixturePath2(file2))
  const expectedObj = `  Property 'common.follow' was added with value: false
  Property 'common.setting2' was removed
  Property 'common.setting3' was updated. From true to null
  Property 'common.setting4' was added with value: 'blah blah'
  Property 'common.setting5' was added with value: [complex value]
  Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
  Property 'common.setting6.ops' was added with value: 'vops'
  Property 'group1.baz' was updated. From 'bas' to 'bars'
  Property 'group1.nest' was updated. From [complex value] to 'str'
  Property 'group2' was removed
  Property 'group3' was added with value: [complex value]`;

  expect(formatPlain(resultOfGenDiffFunc)).toEqual(expectedObj);
});

// Проверка 2 вложенных файла json в формате plain
test('gendiffFunction  2 nested json in plain format', () => {
  const file3 = 'file3';
  const file4 = 'file4';

  const getFixturePath1 = (fileFirst) => path.join(__dirname, '..', '__fixtures__', `${fileFirst}.json`);
  const getFixturePath2 = (fileSecond) => path.join(__dirname, '..', '__fixtures__', `${fileSecond}.json`);

  const resultOfGenDiffFunc = gendiffFunction(getFixturePath1(file3), getFixturePath2(file4));
  // console.log(getFixturePath1(file1),getFixturePath2(file2))
  const expectedObj = `  Property 'common.follow' was added with value: false
  Property 'common.setting2' was removed
  Property 'common.setting3' was updated. From true to null
  Property 'common.setting4' was added with value: 'blah blah'
  Property 'common.setting5' was added with value: [complex value]
  Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
  Property 'common.setting6.ops' was added with value: 'vops'
  Property 'group1.baz' was updated. From 'bas' to 'bars'
  Property 'group1.nest' was updated. From [complex value] to 'str'
  Property 'group2' was removed
  Property 'group3' was added with value: [complex value]`;

  expect(formatPlain(resultOfGenDiffFunc)).toEqual(expectedObj);
});
