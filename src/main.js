// import _ from 'lodash';
import parseFile from '../bin/parsers.js';
import {
  // hasKey,
  getUniqKeysFromObj,
  createInitTree,
  // equalKeyInTwoObj,
  // handelKeyOnlyInObj1,
  // equalKeyAndValueInTwoObj,
  // handelKeyOnlyInObj2,
  // defaultCaseFunction,
  checkDiffConditionFunc,
  // buildNestedNode
} from '../bin/helper.js';

// Функция построения дерева
const buildTree = (obj1, obj2, isUnchanged = false) => {
  const sortedKeys = getUniqKeysFromObj(obj1, obj2);
  const packTree = sortedKeys.map((key) => {
    const node = createInitTree(key);
    checkDiffConditionFunc(obj1, obj2, node, key, isUnchanged);
    return node;
  });
  return packTree;
};

// Основная функция
const gendiffFunction = ((filepath1, filepath2) => {
  const object1 = parseFile(filepath1);
  const object2 = parseFile(filepath2);
  const resultOfBuildTree = buildTree(object1, object2);
  return resultOfBuildTree;
  // console.log(JSON.stringify(result, null, '  '));
  // console.log(JSON.stringify(buildTree(object1, object2), null, '  '));
});

export { gendiffFunction, buildTree };
