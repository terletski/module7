const chai = require(`chai`);
const expect = chai.expect;
const testDB = require(`../DB.json`);
const testSheets = require(`../SHEETS.json`);
const sendRequest = require(`../sheets`);

describe(`Does the data match`, async () => {
    beforeEach(() => {
        sendRequest.readFromSheets();
    })
    console.log(`Start tests`);
    it('should equal data from Google Sheets and DB', () => {
        const testDbParse = JSON.stringify(testDB, null);
        const testSheetsParse = JSON.stringify(testSheets, null);
        console.log(`111${testSheetsParse}111`);
        console.log(`222${testDbParse}222`);
        expect(testSheetsParse).to.contain(testDbParse, `Data do not match`);
    });
});   