import _ from 'lodash';

const getUniqKeysFromObj = (obj1, obj2) => {
  const keys = Object.keys(obj1).concat(Object.keys(obj2));
  const uniqKeys = _.uniq(keys);
  const sortedKeys = _.sortBy(uniqKeys);
  return sortedKeys;
};

// Функция построения дерева
const buildTree = (data1, data2) => {
  // const keys = Object.keys({ ...data1, ...data2 });
  const sortedKeys = getUniqKeysFromObj(data1, data2);
  // console.log(`sortedKeys ${sortedKeys}`)
  return sortedKeys.map((key) => {
    // console.log(`KEY ${key}`);
    const value1 = data1[key];
    const value2 = data2[key];
    if (!_.has(data1, key)) {
      return { type: 'added', key, value: value2 };
    }
    if (!_.has(data2, key)) {
      return { type: 'deleted', key, value: value1 };
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { type: 'recursion', key, children: buildTree(value1, value2) };
    }
    if (!_.isEqual(value1, value2)) {
      return {
        type: 'updated', key, value1, value2,
      };
    }
    return { type: 'unchanged', key, value: value1 };
  });
};

export default buildTree;
