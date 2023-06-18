import _ from 'lodash';

// //////////// Дополнительные функции для работы файла main.js////////////////////////

// Функция для проверки сущ. ключа в объекте
const hasKey = (obj, key) => {
  const result = Object.prototype.hasOwnProperty.call(obj, key);
  return result;
};

// Функция вывода уникальных ключей из 2-х объектов
const getUniqKeysFromObj = (obj1, obj2) => {
  const keys = Object.keys(obj1).concat(Object.keys(obj2));
  const uniqKeys = _.uniq(keys);
  const sortedKeys = _.sortBy(uniqKeys);
  return sortedKeys;
};

// Функция шаблон построения дерева
const createInitTree = (name, type, status = '', children = [], value = '') => ({
  name,
  type,
  status,
  children,
  value,
});

// Функция, когда ключи равны в обоих объектах
const equalKeyInTwoObj = (node, value1, value2) => {
  node.type = 'nested';
  node.status = 'unchanged';
  node.children = buildTree(value1, value2);
};

// Функция, когда ключ есть только в 1 объекте
const handelKeyOnlyInObj1 = (node, value1, isUnchanged) => {
  node.status = isUnchanged ? 'unchanged' : 'deleted';
  // Значение ключа - лист в 1 объекте
  if (!_.isObject(value1)) {
    node.type = 'leaf';
    node.value = { oldValue: value1 };
  // Значение ключа объект в 1 объекте
  } else {
    node.type = 'nested';
    node.children = buildTree(value1, {}, true);
  }
};

// Функция, когда ключ есть только во 2 объекте
const handelKeyOnlyInObj2 = (node, value2, isUnchanged) => {
  node.status = isUnchanged ? 'unchanged' : 'added';
  if (!_.isObject(value2)) {
    node.type = 'leaf';
    node.value = { newValue: value2 };
    // Значение ключа объект 2 объекте
  } else {
    node.type = 'nested';
    node.children = buildTree({}, value2, true);
  }
};

// Функция, когда ключи и значения равны в обоих объектах
const equalKeyAndValueInTwoObj = (node, value1) => {
  node.type = 'leaf';
  node.status = 'unchanged';
  node.value = value1;
};

// Функция для дефолтного сценария
const defaultCaseFunction = (node, key, value1, value2) => {
  node.type = 'nested';
  node.status = 'modified';
  node.children = [
    createInitTree(key, 'leaf', 'deleted', [], value1),
    createInitTree(key, 'leaf', 'added', [], value2),
  ];
};

// Функция проверки разных сценариев и построения узлов
const checkDiffConditionFunc = (obj1, obj2, node, key, isUnchanged) => {
  const value1 = obj1[key];
  const value2 = obj2[key];
  switch (true) {
    // Значения обоих ключей равны и объекты вложенные
    case (_.isObject(value1) && _.isObject(value2)):
      equalKeyInTwoObj(node, value1, value2);
      break;
    // + значения ключей равны
    case (value1 === value2):
      equalKeyAndValueInTwoObj(node, value1);
      break;
    // Ключ есть только в 1 объекте
    case (hasKey(obj1, key) && !hasKey(obj2, key)):
      // handelKeyOnlyInObj(node, value1, isUnchanged);
      handelKeyOnlyInObj1(node, value1, isUnchanged);
      break;
    // Ключ есть только во 2 объекте
    case (!hasKey(obj1, key) && hasKey(obj2, key)):
      // handelKeyOnlyInObj(node, value2, isUnchanged);
      handelKeyOnlyInObj2(node, value2, isUnchanged);
      break;
    // Ключ есть в обоих объектах и значения не равны
    case (hasKey(obj1, key) && hasKey(obj2, key) && value1 != value2):
      node.type = 'leaf';
      node.status = 'modified';
      node.value = { oldValue: value1, newValue: value2 };
      break;
    // Дефолт
    default:
      defaultCaseFunction(node, key, value1, value2);
  }
  return node;
};

// Функция построения дерева
const buildTree = (obj1, obj2, isUnchanged = false) => {
  const sortedKeys = getUniqKeysFromObj(obj1, obj2);
  const packTree = sortedKeys.map((key) => {
    const node = createInitTree(key);
    checkDiffConditionFunc(obj1, obj2, node, key, isUnchanged);
    // console.log(JSON.stringify(node, null, '  '));
    return node;
  });
  return packTree;
};

// //////////// Дополнительные функции для работы файла stylish.js////////////////////////

// Функция добавления строки в массив в зависимости от статуса
const processStatus = (node, indent, result, depth, valueKey, value) => {
  result.push(`${indent}${valueKey} ${node.name}: ${getValueString(value, depth + 1)}`);
};

// Функция обработка значений
const getValueString = (value, depth, spaceCount = 4) => {
  if (_.isObject(value)) {
    switch (true) {
      case value.oldValue !== undefined:
        return value.oldValue !== null ? value.oldValue.toString() : 'null';

      case value.newValue !== undefined:
        return value.newValue !== null ? value.newValue.toString() : 'null';

      default:
    }
    const indent = ' '.repeat(depth * spaceCount);
    const closeBracketsIndent = ' '.repeat((depth - 1) * spaceCount);
    const lines = Object.entries(value).map(([key, val]) => `${indent}${key}: ${getValueString(val, depth)}`);
    return `{\n${lines.join('\n')}\n${closeBracketsIndent}}`;
  }
  return value !== null ? value.toString() : 'null';
};

// Функция обработки листового узла
const processLeafNode = (node, indent, result, depth) => {
  switch (true) {
    case node.status === 'added':
      processStatus(node, indent, result, depth, '+', node.value.newValue);
      // console.log(`node.value.newValue ${node.value.newValue}`)
      break;

    case node.status === 'deleted':
      processStatus(node, indent, result, depth, '-', node.value.oldValue);
      // console.log(`node.value.oldValue ${node.value.oldValue}`)
      break;

    case node.status === 'modified':
      processStatus(node, indent, result, depth, '-', node.value.oldValue);
      processStatus(node, indent, result, depth, '+', node.value.newValue);
      break;

    case node.status === 'unchanged':
      processStatus(node, indent, result, depth, ' ', node.value);
      // console.log(`node.value ${node.value}`)
      break;

    default:
      processStatus(node, indent, result, depth, ' ', node.value = 'Unknown status');
      break;
  }
};

// Функция обработки вложенного узла
const processNestedNode = (node, indent, result, depth, spaceCount = 4, replacer = '') => {
  if (node.type === 'leaf') {
    processLeafNode(node, indent, result, depth);
    return;
  }
  const openingBracket = node.status === 'added' || node.status === 'deleted' ? `${indent}${node.status === 'added' ? '+' : '-'} ${node.name}: {` : `${indent}  ${node.name}: {`;
  result.push(openingBracket);
  node.children.forEach((child) => {
    processNestedNode(child, indent + ' '.repeat(spaceCount), result, depth + 1, spaceCount, replacer);
  });

  result.push(`${indent}  ${replacer.repeat(spaceCount)}}`);
};

export {
  hasKey,
  getUniqKeysFromObj,
  createInitTree,
  equalKeyInTwoObj,
  // handelKeyOnlyInObj,
  equalKeyAndValueInTwoObj,
  handelKeyOnlyInObj1,
  handelKeyOnlyInObj2,
  defaultCaseFunction,
  checkDiffConditionFunc,
  // buildNestedNode,
  getValueString,
  processLeafNode,
  processNestedNode,
  buildTree
};
