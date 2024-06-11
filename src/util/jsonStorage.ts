import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, '../tmp/');

export const readJsonFile = (file: string): any => {
  try {
    const data = fs.readFileSync(path.join(filePath, file), 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading JSON file:', err);
    return {};
  }
};

export const writeJsonFile = (file: string, data: any): void => {
  try {
    fs.writeFileSync(path.join(filePath, file), JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing JSON file:', err);
  }
};

export const deleteJsonFile = (file: string): void => {
  try {
    fs.unlinkSync(path.join(filePath, file));
  } catch (err) {
    console.error('Error deleting JSON file:', 'No existia');
  }
}

export const createTmpFolder = (): void => {
  try {
    fs.mkdirSync(filePath);
  } catch (err) {
    console.error('Error creating tmp folder');
  }
}