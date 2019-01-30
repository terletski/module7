const chai = require(`chai`);
const expect = chai.expect;
const sendRequest = require(`../sheets`);
const readFromDb = require(`../mongoDBMethods`);
const MongoClient = require(`mongodb`).MongoClient;
const url = `mongodb://localhost:27017/`;
const client = new MongoClient(url, { useNewUrlParser: true });

describe(`Does the data match`, () => {
    console.log(`Start tests`);
    it('should equal data from Google Sheets and DB', async () => {
        client.connect();
        const db = client.db(`usersdb`);
        // const dataFromSheets = await sendRequest.readFromSheets();
        const dataFromSheets = 1;
        const dataFromDb = await readFromDb.joinCollections(db);
        console.log(`111${await dataFromSheets}111`);
        console.log(`222${await dataFromDb}222`);
        expect(dataFromSheets).to.contain(dataFromDb, `Data do not match`);
    });
});   