import {buildTree} from '../bin/helper.js';


const processNodePlain = (node, path = '', indent = '  ') => {
  let result = [];
  const { name, type, status, value, children } = node;
  const fullPath = path ? `${path}.${name}` : name;
  // console.log(node)
  switch (status) {
    case 'added':
      if (type === 'leaf') {
        return `${indent}Property '${fullPath}' was added with value: ${formatValue(value.newValue)}`;
      } else {
        return `${indent}Property '${fullPath}' was added with value: [complex value]`;
          // children.map((child) => processNodePlain(child, fullPath)).join('\n');
      }
    case 'deleted':
      return `${indent}Property '${fullPath}' was removed`;
    case 'modified':
      return `${indent}Property '${fullPath}' was updated. From ${formatValue(value.oldValue)} to ${formatValue(value.newValue)}`;
    case 'unchanged':
      if (type === 'leaf') {
        return '';
      } else {
        return  children.map((child) => processNodePlain(child, fullPath)).filter(Boolean).join('\n');
      }
    default:
      return '';
  }
};


//const tree = buildTree(object1, object2);
//const plainDiff = formatDiffPlain(tree);

const formatDiffPlain = (tree) => {
  return tree.flatMap((node) => processNodePlain(node)).join('\n');
};

const formatValue = (value) => {
  switch(true) {
   case value === null:
     return 'null';
   
   case typeof value === 'object':
     return '[complex value]';

   case (typeof value === 'string'):
     return `'${value}'`;

   default: return String(value);
 }
};
export default formatDiffPlain;

