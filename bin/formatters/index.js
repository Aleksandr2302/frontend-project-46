import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import jsonFormat from './json.js';
import { gendiffFunction } from '../../src/main.js';
// import { error } from 'console';

const selectFormat = (format, filepath1, filepath2) => {
  const resultOfGendiffFunc = gendiffFunction(filepath1, filepath2);
  // console.log(resultOfGendiffFunc)
  switch (format) {
    case 'stylish':
      return formatStylish(resultOfGendiffFunc);

    case 'plain':
      return formatPlain(resultOfGendiffFunc);

    case 'json':
      return jsonFormat(resultOfGendiffFunc);

    default: throw new Error(`Unknown Format:${format}`);
  }
};
export { selectFormat };
