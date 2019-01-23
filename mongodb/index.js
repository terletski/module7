const MongoClient = require(`mongodb`).MongoClient;
const mongoDB = require(`./mongoDBMethods.js`);
const argv = require(`yargs`).argv;
const url = `mongodb://localhost:27017/`;

const client = new MongoClient(url, { useNewUrlParser: true });

async function mongoDbMethods () {
  let method;
  client.connect(async function (err) {
    if (err) { throw err; }
    console.log(`Successful server connection`);
    const db = client.db(`usersdb`);
    if (argv.insertManyFromUsers) {
      instertManyObjectsFromUsers(db);
      method = `insertManyFromUsers`;
    }
    if (argv.insertManyFromCars) {
      instertManyObjectsFromCars(db);
      method = `insertManyFromCars`;
    }
    if (argv.find) {
      findObject(db);
      method = `find`;
    }
    if (argv.findAll) {
      findAllObjects(db);
      method = `findAll`;
    }
    if (argv.sort) {
      sortObjects(db);
      method = `sort`;
    }
    if (argv.deleteOne) {
      deleteObject(db);
      method = `deleteOne`;
    }
    if (argv.deleteMany) {
      deleteManyObjects(db);
      method = `deleteMany`;
    }
    if (argv.drop) {
      deleteCollection(db);
      method = `drop`;
    }
    if (argv.updateOne) {
      updateOneObject(db);
      method = `updateOne`;
    }
    if (argv.aggregate) {
      joinObjectsInCollections(db);
      method = `aggregate`;
    }
    if (!method) {
      console.log(`Incorrect method`);
      client.close();
    }
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
