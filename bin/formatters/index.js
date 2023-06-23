import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import jsonFormat from './json.js';

const selectFormat = (format, resultOfBuildTree) => {
  // const resultOfGendiffFunc = gendiffFunction(filepath1, filepath2);
  // console.log(resultOfGendiffFunc)
  switch (format) {
    case 'stylish':
      return formatStylish(resultOfBuildTree);

    case 'plain':
      return formatPlain(resultOfBuildTree);

    case 'json':
      return jsonFormat(resultOfBuildTree);

    default: throw new Error(`Unknown Format:${format}`);
  }
};
export { selectFormat };
