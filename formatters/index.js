import formatDiffStylishDefault from '../formatters/stylish.js';
import formatDiffPlain from '../formatters/plain.js';
import { gendiffFunction } from '../src/main.js';

const selectFormat = (format, filepath1, filepath2 ) =>{
  let result = '';
  const resultOfGendiffFunc = gendiffFunction(filepath1, filepath2);
  if (format === 'stylish') {
    return formatDiffStylishDefault(resultOfGendiffFunc);
  } else if (format === 'plain') {
    return formatDiffPlain(resultOfGendiffFunc);
  }
};
export {selectFormat};