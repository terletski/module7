const MongoClient = require(`mongodb`).MongoClient;
const mongoDB = require(`./mongoDBMethods.js`);
const argv = require(`yargs`).argv;
const fs = require(`fs`);
const url = `mongodb://localhost:27017/`;
const json = `DB.json`;

const client = new MongoClient(url, { useNewUrlParser: true });

async function mongoDbMethods () {
  let method;
  client.connect(async function (err) {
    if (err) throw err;
    console.log(`Successful server connection`);
    const db = client.db(`usersdb`);
    if (argv.insertManyFromUsers) {
      method = `insertManyFromUsers`;
      instertManyObjectsFromUsers(db);
    } else if (argv.insertManyFromCars) {
      method = `insertManyFromCars`;
      instertManyObjectsFromCars(db);
    } else if (argv.find) {
      method = `find`;
      findObject(db);
    } else if (argv.findAll) {
      method = `findAll`;
      findAllObjects(db);
    } else if (argv.sort) {
      method = `sort`;
      sortObjects(db);
    } else if (argv.deleteOne) {
      method = `deleteOne`;
      deleteObject(db);
    } else if (argv.deleteMany) {
      deleteManyObjects(db);
      method = `deleteMany`;
    } else if (argv.drop) {
      method = `drop`;
      deleteCollection(db);
    } else if (argv.updateOne) {
      method = `updateOne`;
      updateOneObject(db);
    } else if (argv.aggregate) {
      method = `aggregate`;
      joinObjectsInCollections(db);
    } else if (argv.writeToJson) {
      method = `writeToJson`;
      writeToJsonFromDB(db);
    } else if (!method) {
      console.log(`Incorrect method`);
      client.close();
    }
  });
}

async function writeToJsonFromDB (db) {
  mongoDB.findAllDocuments(db, function (result) {
    fs.existsSync(json) ? console.log(`${json} has been overwritten`) : console.log(`${json} was created`);
    fs.writeFileSync(json, JSON.stringify(result));
    client.close();
  });
}

async function instertManyObjectsFromUsers (db) {
  mongoDB.insertManyDocumentsFromUsers(db, function () {
    client.close();
  });
};

async function instertManyObjectsFromCars (db) {
  mongoDB.insertManyDocumentsFromCars(db, function () {
    client.close();
  });
};

async function findObject (db) {
  mongoDB.findDocument(db, function () {
    client.close();
  });
};

async function findAllObjects (db) {
  mongoDB.findAllDocuments(db, function () {
    client.close();
  });
};

async function sortObjects (db) {
  mongoDB.sortDocuments(db, function () {
    client.close();
  });
};

async function deleteObject (db) {
  mongoDB.deleteDocument(db, function () {
    client.close();
  });
};

async function deleteManyObjects (db) {
  mongoDB.deleteManyDocuments(db, function () {
    client.close();
  });
};

async function deleteCollection (db) {
  mongoDB.dropCollection(db, function () {
    client.close();
  });
};

async function updateOneObject (db) {
  mongoDB.updateOneDocument(db, function () {
    client.close();
  });
};

async function joinObjectsInCollections (db) {
  mongoDB.joinCollections(db, function () {
    client.close();
  });
};

mongoDbMethods();
