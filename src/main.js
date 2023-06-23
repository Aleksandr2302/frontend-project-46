import parseFile from '../bin/parsers.js';
import { buildTree } from '../bin/buildTree.js';
import { selectFormat } from '../bin/formatters/index.js';

// Основная функция
const gendiffFunction = ((filepath1, filepath2, format = 'stylish') => {
  const object1 = parseFile(filepath1);
  const object2 = parseFile(filepath2);
  const resultOfBuildTree = buildTree(object1, object2);
  // console.log(JSON.stringify(buildTree(object1, object2), null, '  '));
  // return resultOfBuildTree;
  return selectFormat(format, resultOfBuildTree);
  // console.log(JSON.stringify(result, null, '  '));
  // console.log(JSON.stringify(buildTree(object1, object2), null, '  '));
});

export default gendiffFunction;
