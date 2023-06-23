const formatValue = (value) => {
  switch (true) {
    case value === null:
      return 'null';

    case typeof value === 'object':
      return '[complex value]';

    case (typeof value === 'string'):
      return `'${value}'`;

    default: return String(value);
  }
};

const formatPlain = (innerTree) => {
  // console.log(`innrerTree ${innerTree}`)
  const format = (nodes, parent) => nodes
    .filter((node) => node.type !== 'unchanged')
    .map((node) => {
      const property = parent ? `${parent}.${node.key}` : node.key;
      switch (node.type) {
        case 'added':
          return `  Property '${property}' was added with value: ${formatValue(node.value)}`;
        case 'deleted':
          return `  Property '${property}' was removed`;
        case 'updated':
          return `  Property '${property}' was updated. From ${formatValue(node.value1)} to ${formatValue(node.value2)}`;
        case 'recursion':
          return `${format(node.children, property)}`;
        default:
          throw new Error(`This type does not exist: ${node.type}`);
      }
    }).join('\n');
  return format(innerTree, 0);
};

export default formatPlain;
