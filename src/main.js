// import _ from 'lodash';
import parseFile from '../bin/parsers.js';
import {
  // hasKey,
  // getUniqKeysFromObj,
  // createInitTree,
  buildTree,
  // equalKeyInTwoObj,
  // handelKeyOnlyInObj1,
  // equalKeyAndValueInTwoObj,
  // handelKeyOnlyInObj2,
  // defaultCaseFunction,
  // checkDiffConditionFunc,
  // buildNestedNode
} from '../bin/helper.js';

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
