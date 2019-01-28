const chai = require(`chai`);
const expect = chai.expect;
const testDB = require(`../DB.json`);
const testSheets = require(`../SHEETS.json`);
const fs = require(`fs`);
// const testSheets = require(`../SHEETS.json`);
const sendRequest = require(`../sheets`).readFromSheets;

describe(`Does the data match`, () => {
    console.log(`Start tests`);
    it('should equal data from Google Sheets and DB', () => {
        const testDbParse = JSON.stringify(testDB, null);
        const testSheetsParse = JSON.stringify(testSheets, null);
        console.log(`111${testSheetsParse}111`);
        console.log(`222${testDbParse}222`);
        expect(testSheetsParse).to.contain(testDbParse, `Data do not match`);
    });
});   