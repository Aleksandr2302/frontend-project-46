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
  node.children = buildNestedNode(value1, value2);
};

// Функция, когда ключ есть только в 1 объекте
const handelKeyOnlyInObj1 = (node, value1, isUnchanged) => {
  // Значение ключа - лист в 1 объекте
  if (!_.isObject(value1)) {
    node.status = isUnchanged ? 'unchanged' : 'deleted';
    node.type = 'leaf';
    node.value = { oldValue: value1 };
  // Значение ключа объект в 1 объекте
  } else {
    node.status = isUnchanged ? 'unchanged' : 'deleted';
    node.type = 'nested';
    node.children = buildNestedNode(value1, {}, true);
  }
};

// Функция, когда ключи и значения равны в обоих объектах
const equalKeyAndValueInTwoObj = (node, value1) => {
  node.type = 'leaf';
  node.status = 'unchanged';
  node.value = value1;
};

// Функция, когда ключ есть только во 2 объекте
const handelKeyOnlyInObj2 = (node, value2, isUnchanged) => {
  if (!_.isObject(value2)) {
    node.status = isUnchanged ? 'unchanged' : 'added';
    node.type = 'leaf';
    node.value = { newValue: value2 };
    // Значение ключа объект 2 объекте
  } else {
    node.status = isUnchanged ? 'unchanged' : 'added';
    node.type = 'nested';
    node.value = value2;
    node.children = buildNestedNode({}, value2, true);
  }
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
      handelKeyOnlyInObj1(node, value1, isUnchanged);
      break;
    // Ключ есть только во 2 объекте
    case (!hasKey(obj1, key) && hasKey(obj2, key)):
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

// Функция обработки вложенных узлов
const buildNestedNode = (obj1, obj2, isUnchanged = false) => {
  const sortedKeys = getUniqKeysFromObj(obj1, obj2);
  const nestedNode = sortedKeys.map((key) => {
    const node = createInitTree(key);
    checkDiffConditionFunc(obj1, obj2, node, key, isUnchanged);
    return node;
  });
  return nestedNode;
};

// //////////// Дополнительные функции для работы файла stylish.js////////////////////////
const getValueString = (value, depth, spaceCount = 4) => {
  if (_.isObject(value)) {
    if (value.oldValue !== undefined) {
      return value.oldValue !== null ? value.oldValue.toString() : 'null';
    } if (value.newValue !== undefined) {
      return value.newValue !== null ? value.newValue.toString() : 'null';
    }
    const indent = ' '.repeat(depth * spaceCount);
    const closeBracketsIndent = ' '.repeat((depth - 1) * spaceCount);
    const lines = Object.entries(value).map(([key, val]) => `${indent}${key}: ${getValueString(val, depth)}`);
    return `{\n${lines.join('\n')}\n${closeBracketsIndent}}`;
  }
  if (value === undefined) {
    return 'undefined';
  }
  return value !== null ? value.toString() : 'null';
};

// Функция обработки листового узла
const processLeafNode = (node, indent, result, depth) => {
  switch (true) {
    case node.status === 'added':
      result.push(`${indent}+ ${node.name}: ${getValueString(node.value.newValue, depth + 1)}`);
      break;

    case node.status === 'deleted':
      result.push(`${indent}- ${node.name}: ${getValueString(node.value.oldValue, depth + 1)}`);
      break;

    case node.status === 'modified':
      result.push(`${indent}- ${node.name}: ${getValueString(node.value.oldValue, depth + 1)}`);
      result.push(`${indent}+ ${node.name}: ${getValueString(node.value.newValue, depth + 1)}`);
      break;

    case node.status === 'unchanged':
      result.push(`${indent}  ${node.name}: ${getValueString(node.value, depth + 1)}`);
      break;

    default:
      result.push(`${indent}  ${node.name}: Unknown status`);
      break;
  }
};

// Функция обработки вложенного узла
const processNestedNode = (node, indent, result, depth, spaceCount = 4, replacer = '') => {
  if (node.type === 'leaf') {
    processLeafNode(node, indent, result, depth);
  } else if (node.type === 'nested') {
    if (node.status === 'added' || node.status === 'deleted') {
      result.push(`${indent}${node.status === 'added' ? '+' : '-'} ${node.name}: {`);
      node.children.forEach((child) => {
        processNestedNode(child, indent + ' '.repeat(spaceCount), result, depth + 1, spaceCount, replacer);
      });
      result.push(`${indent}${replacer.repeat(spaceCount - 2)}  }`);
    } else {
      result.push(`${indent}  ${node.name}: {`);
      node.children.forEach((child) => {
        processNestedNode(child, indent + ' '.repeat(spaceCount), result, depth + 1, spaceCount, replacer);
      });
      result.push(`${indent}  ${replacer.repeat(spaceCount)}}`);
    }
  }
};

export {
  hasKey,
  getUniqKeysFromObj,
  createInitTree,
  equalKeyInTwoObj,
  handelKeyOnlyInObj1,
  equalKeyAndValueInTwoObj,
  handelKeyOnlyInObj2,
  defaultCaseFunction,
  checkDiffConditionFunc,
  buildNestedNode,
  getValueString,
  processLeafNode,
  processNestedNode
};
