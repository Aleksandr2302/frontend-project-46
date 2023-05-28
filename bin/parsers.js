import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parseFile = (filepath) => {
  const fileExtension = path.extname(filepath);
  if (fileExtension === '.json') {
    const fileContent = fs.readFileSync(path.resolve(filepath));
    return JSON.parse(fileContent);
  } if (fileExtension === '.yaml' || fileExtension === '.yml') {
    const fileContent = fs.readFileSync(filepath, 'utf8');
    return yaml.load(fileContent);
  }
  throw new Error(`Unsupported file format: ${fileExtension}`);
};

export default parseFile;
