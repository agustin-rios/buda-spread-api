import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, '../tmp/alertSpread.json');

export const readJsonFile = (): any => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading JSON file:', err);
    return {};
  }
};

export const writeJsonFile = (data: any): void => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing JSON file:', err);
  }
};
