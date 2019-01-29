const users = require(`./models/users.json`);
const cars = require(`./models/cars.json`);

async function insertManyDocumentsFromUsers (db, call) {
  const collection = db.collection(`users`);
  collection.insertMany(users, function (err, result) {
    if (err) throw err;
    console.log(result);
    call(result);
  });
}

async function insertManyDocumentsFromCars (db, call) {
  const collection = db.collection(`cars`);
  collection.insertMany(cars, function (err, result) {
    if (err) throw err;
    console.log(result);
    call(result);
  });
}

async function findDocument (db, call) {
  const collection = db.collection(`users`);
  const query = { address: /^S/ };
  collection.find(query).toArray(function (err, result) {
    if (err) throw err;
    console.log(result);
    call(result);
  });
};

async function findAllDocuments (db, call) {
  const collection = db.collection(`users`);
  collection.find({}).toArray(function (err, result) {
    if (err) throw err;
    console.log(result);
    call(result);
  });
};

async function sortDocuments (db, call) {
  const collection = db.collection(`users`);
  const mysort = { name: 1 };
  collection.find().sort(mysort).toArray(function (err, result) {
    if (err) throw err;
    console.log(`sort ascending was completed`);
    console.log(result);
    call(result);
  });
};

async function deleteDocument (db) {
  const collection = db.collection(`users`);
  const myquery = { address: `Mountain 21` };
  collection.deleteOne(myquery, function (err) {
    if (err) throw err;
    const myQueryJSON = JSON.stringify(myquery);
    console.log(`1 document deleted ${myQueryJSON}`);
  });
};

async function deleteManyDocuments (db) {
  const collection = db.collection(`users`);
  const myquery = { address: /^O/ };
  collection.deleteMany(myquery, function (err, obj) {
    if (err) throw err;
    const myQueryJSON = JSON.stringify(myquery);
    console.log(`${obj.result.n} documents deleted ${myQueryJSON}`);
  });
};

async function dropCollection (db) {
  const collection = db.collection(`users`);
  collection.drop(function (err, delOK) {
    if (err) throw err;
    if (delOK) console.log(`Collection deleted`);
  });
};

async function updateOneDocument (db) {
  const collection = db.collection(`users`);
  const myquery = { address: `Sky st 331` };
  const newValues = { $set: { name: `Mickey`, address: `Canyon 123` } };
  const myQueryJSON = JSON.stringify(myquery);
  const myNewValueJSON = JSON.stringify(newValues);
  collection.updateOne(myquery, newValues, function (err) {
    if (err) throw err;
    console.log(`1 document updated: ${myQueryJSON} changed to ${myNewValueJSON}`);
  });
};

async function joinCollections (db, call) {
  const collection = db.collection(`users`);
  const mysort = { name: 1 };
  collection.aggregate([
    { $lookup:
       {
         from: `cars`,
         localField: `user_id`,
         foreignField: `user_id`,
         as: `cardetails`
       }
    },
    { $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ `$cardetails`, 0 ] }, `$$ROOT` ] } } },
    { $project: { cardetails: 0 } }
  ]).sort(mysort).toArray(function (err, res) {
    if (err) throw err;
    const result = JSON.stringify(res);
    console.log(result);
    call(result);
  });
};

module.exports = {
  insertManyDocumentsFromUsers,
  insertManyDocumentsFromCars,
  findDocument,
  findAllDocuments,
  sortDocuments,
  deleteDocument,
  deleteManyDocuments,
  dropCollection,
  updateOneDocument,
  joinCollections
};
