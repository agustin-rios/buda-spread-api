import fs from 'fs';
import path from 'path';
import { readJsonFile, writeJsonFile, deleteJsonFile, createTmpFolder } from '../../src/util/jsonStorage';

jest.mock('fs');

describe('jsonStorage', () => {
  const filePath = path.join(__dirname, '../../src/tmp/');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('readJsonFile', () => {
    it('should read and parse the JSON file', () => {
      const file = 'data.json';
      const jsonData = { name: 'John Doe', age: 30 };
      const readFileSpy = jest.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(jsonData));

      const result = readJsonFile(file);

      expect(readFileSpy).toHaveBeenCalledWith(path.join(filePath, file), 'utf8');
      expect(result).toEqual(jsonData);
    });

    it('should return an empty object if there is an error reading the file', () => {
      const file = 'data.json';
      const readFileSpy = jest.spyOn(fs, 'readFileSync').mockImplementation(() => {
        throw new Error('File read error');
      });

      const result = readJsonFile(file);

      expect(readFileSpy).toHaveBeenCalledWith(path.join(filePath, file), 'utf8');
      expect(result).toEqual({});
      expect(console.error).toHaveBeenCalledWith('Error reading JSON file:', expect.any(Error));
    });
  });

  describe('writeJsonFile', () => {
    it('should write the JSON data to the file', () => {
      const file = 'data.json';
      const jsonData = { name: 'John Doe', age: 30 };
      const writeFileSpy = jest.spyOn(fs, 'writeFileSync');

      writeJsonFile(file, jsonData);

      expect(writeFileSpy).toHaveBeenCalledWith(path.join(filePath, file), JSON.stringify(jsonData, null, 2), 'utf8');
    });

    it('should log an error if there is an error writing the file', () => {
      const file = 'data.json';
      const jsonData = { name: 'John Doe', age: 30 };
      const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {
        throw new Error('File write error');
      });

      writeJsonFile(file, jsonData);

      expect(writeFileSpy).toHaveBeenCalledWith(path.join(filePath, file), JSON.stringify(jsonData, null, 2), 'utf8');
      expect(console.error).toHaveBeenCalledWith('Error writing JSON file:', expect.any(Error));
    });
  });

  describe('deleteJsonFile', () => {
    it('should delete the JSON file', () => {
      const file = 'data.json';
      const unlinkSyncSpy = jest.spyOn(fs, 'unlinkSync');

      deleteJsonFile(file);

      expect(unlinkSyncSpy).toHaveBeenCalledWith(path.join(filePath, file));
    });

    it('should log an error if there is an error deleting the file', () => {
      const file = 'data.json';
      const unlinkSyncSpy = jest.spyOn(fs, 'unlinkSync').mockImplementation(() => {
        throw new Error('File delete error');
      });

      deleteJsonFile(file);

      expect(unlinkSyncSpy).toHaveBeenCalledWith(path.join(filePath, file));
      expect(console.error).toHaveBeenCalledWith('Error deleting JSON file:', 'No existia');
    });
  });

  describe('createTmpFolder', () => {
    it('should create the tmp folder', () => {
      const mkdirSyncSpy = jest.spyOn(fs, 'mkdirSync');

      createTmpFolder();

      expect(mkdirSyncSpy).toHaveBeenCalledWith(filePath);
    });

    it('should log an error if there is an error creating the folder', () => {
      const mkdirSyncSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
        throw new Error('Folder creation error');
      });

      createTmpFolder();

      expect(mkdirSyncSpy).toHaveBeenCalledWith(filePath);
      expect(console.error).toHaveBeenCalledWith('Error creating tmp folder');
    });
  });
});