import _ from 'lodash';

const indent = (depth) => ' '.repeat((depth * 4) - 2);

// Функция приведение к строки значений
const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const keys = Object.keys(value);
  const getKeys = keys.map((key) => `${indent(depth + 1)}  ${key}: ${stringify(value[key], depth + 1)}`);
  return `{\n${getKeys.join('\n')}\n  ${indent(depth)}}`;
};

const formatStylish = (innerTree) => {
  const iter = (tree, depth) => tree.map((node) => {
    // console.log(node);
    const getValue = (value, sign) => `${indent(depth)}${sign} ${node.key}: ${stringify(value, depth)}\n`;
    switch (node.type) {
      case 'added':
        return getValue(node.value, '+');
      case 'deleted':
        return getValue(node.value, '-');
      case 'unchanged':
        return getValue(node.value, ' ');
      case 'updated':
        return `${getValue(node.value1, '-')}${getValue(node.value2, '+')}`;
      case 'recursion':
        return `${indent(depth)}  ${node.key}: {\n${iter(node.children, depth + 1).join('')}${indent(depth)}  }\n`;
      default:
        throw new Error(`This type does not exist: ${node.type}`);
    }
  });
  return `{\n${iter(innerTree, 1).join('')}}`;
};
export default formatStylish;
