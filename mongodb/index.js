const MongoClient = require(`mongodb`).MongoClient;
const mongoDB = require(`./mongoDBMethods.js`);
const argv = require(`yargs`).argv;
const url = `mongodb://localhost:27017/`;

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
    }
    if (argv.insertManyFromCars) {
      method = `insertManyFromCars`;
      instertManyObjectsFromCars(db);
    }
    if (argv.find) {
      method = `find`;
      findObject(db);
    }
    if (argv.findAll) {
      method = `findAll`;
      findAllObjects(db);
    }
    if (argv.sort) {
      method = `sort`;
      sortObjects(db);
    }
    if (argv.deleteOne) {
      method = `deleteOne`;
      deleteObject(db);
    }
    if (argv.deleteMany) {
      deleteManyObjects(db);
      method = `deleteMany`;
    }
    if (argv.drop) {
      method = `drop`;
      deleteCollection(db);
    }
    if (argv.updateOne) {
      method = `updateOne`;
      updateOneObject(db);
    }
    if (argv.aggregate) {
      method = `aggregate`;
      joinObjectsInCollections(db);
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
