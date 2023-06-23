import path from 'path';
import { fileURLToPath } from 'url';
import formatStylish from '../bin/formatters/stylish.js';
import formatPlain from '../bin/formatters/plain.js';
import gendiffFunction from '../src/main.js';
import parseFile from '../bin/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 4 Проверки в формате stylish //
// Проверка 2 плоских файла json в формате stylish
test('gendiffFunction 2 flat json in stylish format', () => {
  const file1 = 'file1';
  const file2 = 'file2';

  const getFixturePath1 = (fileFirst) => path.join(__dirname, '..', '__fixtures__', `${fileFirst}.json`);
  const getFixturePath2 = (fileSecond) => path.join(__dirname, '..', '__fixtures__', `${fileSecond}.json`);

  const expectedObj = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  // Проверяем результат gendiffFunction для плоских файлов
  expect(gendiffFunction(getFixturePath1(file1), getFixturePath2(file2))).toEqual(expectedObj);
});

// Проверка 2 плоских файла yaml в формате stylish
test('gendiffFunction 2 flat yml in stylish format', () => {
  const file1 = 'file1';
  const file2 = 'file2';

  const getFixturePath1 = (fileFirst) => path.join(__dirname, '..', '__fixtures__', `${fileFirst}.yml`);
  const getFixturePath2 = (fileSecond) => path.join(__dirname, '..', '__fixtures__', `${fileSecond}.yml`);

  const expectedObj = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  expect(gendiffFunction(getFixturePath1(file1), getFixturePath2(file2))).toEqual(expectedObj);
});

// Проверка 2 вложенных файла json в формате stylish
test('gendiffFunction 2 nested json in stylish format', () => {
  const file3 = 'file3';
  const file4 = 'file4';

  const getFixturePath1 = (fileFirst) => path.join(__dirname, '..', '__fixtures__', `${fileFirst}.json`);
  const getFixturePath2 = (fileSecond) => path.join(__dirname, '..', '__fixtures__', `${fileSecond}.json`);

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

  expect(gendiffFunction(getFixturePath1(file3), getFixturePath2(file4))).toEqual(expectedObj);
});

// Проверка 2 вложенных файла yaml в формате stylish
test('gendiffFunction  2 nested yml in stylish format', () => {
  const file3 = 'file3';
  const file4 = 'file4';

  const getFixturePath1 = (fileFirst) => path.join(__dirname, '..', '__fixtures__', `${fileFirst}.yaml`);
  const getFixturePath2 = (fileSecond) => path.join(__dirname, '..', '__fixtures__', `${fileSecond}.yaml`);

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

  expect(gendiffFunction(getFixturePath1(file3), getFixturePath2(file4))).toEqual(expectedObj);
});

// 4 Проверки в формате plain
// Проверка 2 плоских файла json в формате plain
test('gendiffFunction 2 flat json in plain format', () => {
  const file1 = 'file1';
  const file2 = 'file2';

  const getFixturePath1 = (fileFirst) => path.join(__dirname, '..', '__fixtures__', `${fileFirst}.json`);
  const getFixturePath2 = (fileSecond) => path.join(__dirname, '..', '__fixtures__', `${fileSecond}.json`);

  const format = 'plain';

  const expectedObj = `Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true`;

  // Проверяем результат gendiffFunction для плоских файлов
  expect(gendiffFunction(getFixturePath1(file1), getFixturePath2(file2), format))
    .toEqual(expectedObj);
});

// Проверка 2 плоских файла yaml в формате plain
test('gendiffFunction 2 flat yml in plain format', () => {
  const file1 = 'file1';
  const file2 = 'file2';

  const getFixturePath1 = (fileFirst) => path.join(__dirname, '..', '__fixtures__', `${fileFirst}.yml`);
  const getFixturePath2 = (fileSecond) => path.join(__dirname, '..', '__fixtures__', `${fileSecond}.yml`);

  const format = 'plain';

  const expectedObj = `Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true`;

  // Проверяем результат gendiffFunction для плоских файлов
  expect(gendiffFunction(getFixturePath1(file1), getFixturePath2(file2), format))
    .toEqual(expectedObj);
});

// Проверка 2 вложенных файла yaml в формате plain

test('gendiffFunction  2 nested yml in plain format', () => {
  const file3 = 'file3';
  const file4 = 'file4';

  const format = 'plain';

  const getFixturePath1 = (fileFirst) => path.join(__dirname, '..', '__fixtures__', `${fileFirst}.yaml`);
  const getFixturePath2 = (fileSecond) => path.join(__dirname, '..', '__fixtures__', `${fileSecond}.yaml`);

  const expectedObj = `Property 'common.follow' was added with value: false
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

  expect(gendiffFunction(getFixturePath1(file3), getFixturePath2(file4), format))
    .toEqual(expectedObj);
});

// Проверка 2 вложенных файла json в формате plain
test('gendiffFunction  2 nested json in plain format', () => {
  const file3 = 'file3';
  const file4 = 'file4';

  const getFixturePath1 = (fileFirst) => path.join(__dirname, '..', '__fixtures__', `${fileFirst}.json`);
  const getFixturePath2 = (fileSecond) => path.join(__dirname, '..', '__fixtures__', `${fileSecond}.json`);

  const format = 'plain';

  const expectedObj = `Property 'common.follow' was added with value: false
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

  expect(gendiffFunction(getFixturePath1(file3), getFixturePath2(file4), format))
    .toEqual(expectedObj);
});

// 4 Проверки в формате json

// Проверка 2 плоских файла json в формате json
test('gendiffFunction 2 flat json in json format', () => {
  const file1 = 'file1';
  const file2 = 'file2';

  const getFixturePath1 = (fileFirst) => path.join(__dirname, '..', '__fixtures__', `${fileFirst}.json`);
  const getFixturePath2 = (fileSecond) => path.join(__dirname, '..', '__fixtures__', `${fileSecond}.json`);

  const format = 'json';

  const expectedObj = `[
  {
    "type": "deleted",
    "key": "follow",
    "value": false
  },
  {
    "type": "unchanged",
    "key": "host",
    "value": "hexlet.io"
  },
  {
    "type": "deleted",
    "key": "proxy",
    "value": "123.234.53.22"
  },
  {
    "type": "updated",
    "key": "timeout",
    "value1": 50,
    "value2": 20
  },
  {
    "type": "added",
    "key": "verbose",
    "value": true
  }
]`;

  // Проверяем результат gendiffFunction для плоских файлов
  expect(gendiffFunction(getFixturePath1(file1), getFixturePath2(file2), format))
    .toEqual(expectedObj);
});

// Проверка 2 плоских файла json в формате json
test('gendiffFunction 2 flat yml in json format', () => {
  const file1 = 'file1';
  const file2 = 'file2';

  const getFixturePath1 = (fileFirst) => path.join(__dirname, '..', '__fixtures__', `${fileFirst}.yml`);
  const getFixturePath2 = (fileSecond) => path.join(__dirname, '..', '__fixtures__', `${fileSecond}.yml`);
  const format = 'json';

  const expectedObj = `[
  {
    "type": "deleted",
    "key": "follow",
    "value": false
  },
  {
    "type": "unchanged",
    "key": "host",
    "value": "hexlet.io"
  },
  {
    "type": "deleted",
    "key": "proxy",
    "value": "123.234.53.22"
  },
  {
    "type": "updated",
    "key": "timeout",
    "value1": 50,
    "value2": 20
  },
  {
    "type": "added",
    "key": "verbose",
    "value": true
  }
]`;

  // Проверяем результат gendiffFunction для плоских файлов
  expect(gendiffFunction(getFixturePath1(file1), getFixturePath2(file2), format))
    .toEqual(expectedObj);
});

// Проверка 2 вложенных файла yaml в формате plain

test('gendiffFunction  2 nested yml in json format', () => {
  const file3 = 'file3';
  const file4 = 'file4';

  const format = 'json';
  const getFixturePath1 = (fileFirst) => path.join(__dirname, '..', '__fixtures__', `${fileFirst}.yaml`);
  const getFixturePath2 = (fileSecond) => path.join(__dirname, '..', '__fixtures__', `${fileSecond}.yaml`);

  const expectedObj = `[
  {
    "type": "recursion",
    "key": "common",
    "children": [
      {
        "type": "added",
        "key": "follow",
        "value": false
      },
      {
        "type": "unchanged",
        "key": "setting1",
        "value": "Value 1"
      },
      {
        "type": "deleted",
        "key": "setting2",
        "value": 200
      },
      {
        "type": "updated",
        "key": "setting3",
        "value1": true,
        "value2": null
      },
      {
        "type": "added",
        "key": "setting4",
        "value": "blah blah"
      },
      {
        "type": "added",
        "key": "setting5",
        "value": {
          "key5": "value5"
        }
      },
      {
        "type": "recursion",
        "key": "setting6",
        "children": [
          {
            "type": "recursion",
            "key": "doge",
            "children": [
              {
                "type": "updated",
                "key": "wow",
                "value1": "",
                "value2": "so much"
              }
            ]
          },
          {
            "type": "unchanged",
            "key": "key",
            "value": "value"
          },
          {
            "type": "added",
            "key": "ops",
            "value": "vops"
          }
        ]
      }
    ]
  },
  {
    "type": "recursion",
    "key": "group1",
    "children": [
      {
        "type": "updated",
        "key": "baz",
        "value1": "bas",
        "value2": "bars"
      },
      {
        "type": "unchanged",
        "key": "foo",
        "value": "bar"
      },
      {
        "type": "updated",
        "key": "nest",
        "value1": {
          "key": "value"
        },
        "value2": "str"
      }
    ]
  },
  {
    "type": "deleted",
    "key": "group2",
    "value": {
      "abc": 12345,
      "deep": {
        "id": 45
      }
    }
  },
  {
    "type": "added",
    "key": "group3",
    "value": {
      "deep": {
        "id": {
          "number": 45
        }
      },
      "fee": 100500
    }
  }
]`;

  expect(gendiffFunction(getFixturePath1(file3), getFixturePath2(file4), format))
    .toEqual(expectedObj);
});

// Проверка 2 вложенных файла json в формате plain
test('gendiffFunction  2 nested json in json format', () => {
  const file3 = 'file3';
  const file4 = 'file4';

  const getFixturePath1 = (fileFirst) => path.join(__dirname, '..', '__fixtures__', `${fileFirst}.json`);
  const getFixturePath2 = (fileSecond) => path.join(__dirname, '..', '__fixtures__', `${fileSecond}.json`);

  const format = 'json';

  const expectedObj = `[
  {
    "type": "recursion",
    "key": "common",
    "children": [
      {
        "type": "added",
        "key": "follow",
        "value": false
      },
      {
        "type": "unchanged",
        "key": "setting1",
        "value": "Value 1"
      },
      {
        "type": "deleted",
        "key": "setting2",
        "value": 200
      },
      {
        "type": "updated",
        "key": "setting3",
        "value1": true,
        "value2": null
      },
      {
        "type": "added",
        "key": "setting4",
        "value": "blah blah"
      },
      {
        "type": "added",
        "key": "setting5",
        "value": {
          "key5": "value5"
        }
      },
      {
        "type": "recursion",
        "key": "setting6",
        "children": [
          {
            "type": "recursion",
            "key": "doge",
            "children": [
              {
                "type": "updated",
                "key": "wow",
                "value1": "",
                "value2": "so much"
              }
            ]
          },
          {
            "type": "unchanged",
            "key": "key",
            "value": "value"
          },
          {
            "type": "added",
            "key": "ops",
            "value": "vops"
          }
        ]
      }
    ]
  },
  {
    "type": "recursion",
    "key": "group1",
    "children": [
      {
        "type": "updated",
        "key": "baz",
        "value1": "bas",
        "value2": "bars"
      },
      {
        "type": "unchanged",
        "key": "foo",
        "value": "bar"
      },
      {
        "type": "updated",
        "key": "nest",
        "value1": {
          "key": "value"
        },
        "value2": "str"
      }
    ]
  },
  {
    "type": "deleted",
    "key": "group2",
    "value": {
      "abc": 12345,
      "deep": {
        "id": 45
      }
    }
  },
  {
    "type": "added",
    "key": "group3",
    "value": {
      "deep": {
        "id": {
          "number": 45
        }
      },
      "fee": 100500
    }
  }
]`;

  expect(gendiffFunction(getFixturePath1(file3), getFixturePath2(file4), format))
    .toEqual(expectedObj);
});

// Проверка вывода ошибки formatPlain функции из модуля plain.js
test('formatPlain function Error scenario from plain.js module', () => {
  const data1 = [
    {
      type: 'de',
      key: 'follow',
      value: false,
    },
    {
      type: 'unchanged',
      key: 'host',
      value: 'hexlet.io',
    },
  ];

  expect(() => formatPlain(data1)).toThrow('This type does not exist: de');
});

// Проверка вывода ошибки stylishFormat функции из модуля stylish.js
test('stylishFormat function Error scenario from stylish.js module', () => {
  const data1 = [
    {
      type: 'de',
      key: 'follow',
      value: false,
    },
    {
      type: 'unchanged',
      key: 'host',
      value: 'hexlet.io',
    },
  ];

  expect(() => formatStylish(data1)).toThrow('This type does not exist: de');
});

// Проверка вывода ошибки parseFile функции из модуля parsers.js
test('parseFile function Error scenario from parser.js module', () => {
  const data = '\frontend-project-46\file.xxx';
  expect(() => parseFile(data)).toThrow('Unsupported file format: .xxx');
});
