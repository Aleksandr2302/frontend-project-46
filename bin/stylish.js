// import _ from 'lodash';
import { processLeafNode, processNestedNode } from './helper.js';

const nodeTree = (node, depth, spaceCount, replacer) => {
  const result = [];
  const indent = ' '.repeat((depth * spaceCount) - 2);

  if (node.type === 'leaf') {
    processLeafNode(node, indent, result, depth, spaceCount, replacer);
  }

  if (node.type === 'nested') {
    processNestedNode(node, indent, result, depth, spaceCount, replacer);
  }
  return result;
};

const formatDiffStylishDefault = (packTree) => {
  const spaceCount = 4;
  const replacer = '';

  const finalResult = packTree.flatMap((node) => nodeTree(node, 1, spaceCount, replacer));
  return `{\n${finalResult.join('\n')}\n}`;
};
export default formatDiffStylishDefault;
