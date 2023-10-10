const fs = require('fs');
const { expect } = require('chai');
const { getDBFromFile, setDBInFile } = require('./DB.js');

const dbFilePath = './controller/DB/DB.test.json';

describe('Database Functions', () => {
  before(() => {
    // Создайте временный JSON-файл для тестов
    const testData = {"a1":{"value":"2","result":"2"}};
    fs.writeFileSync(dbFilePath, JSON.stringify(testData));
  });

  it('should read data from the file', () => {
    const result = getDBFromFile(dbFilePath);
    expect(result).to.deep.equal({"a1":{"value":"2","result":"2"}});
  });

  it('should set data in the file', () => {
    const testDB = {"a1":{"value":"2","result":"2"}};
    setDBInFile(testDB,dbFilePath);

    const fileContent = fs.readFileSync(dbFilePath, 'utf-8');
    expect(JSON.parse(fileContent)).to.deep.equal(testDB);
  });

  it('should return undefined if file does not exist', () => {
    fs.unlinkSync(dbFilePath);

    const result = getDBFromFile(dbFilePath);
    expect(result).to.be.undefined;
  });
});
