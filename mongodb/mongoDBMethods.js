const users = require(`./models/users.json`);
const cars = require(`./models/cars.json`);
const sheets = require(`./sheets.js`);

async function insertManyDocumentsFromUsers(db, call) {
  const collection = db.collection(`users`);
  collection.insertMany(users, function (err, result) {
    if (err) throw err;
    console.log(result);
    call(result);
  });
}

async function insertManyDocumentsFromCars(db, call) {
  const collection = db.collection(`cars`);
  collection.insertMany(cars, function (err, result) {
    if (err) throw err;
    console.log(result);
    call(result);
  });
}

async function findDocument(db, call) {
  const collection = db.collection(`users`);
  const query = { address: /^S/ };
  collection.find(query).toArray(function (err, result) {
    if (err) throw err;
    console.log(result);
    call(result);
  });
};

async function findAllDocuments(db, call) {
  const collection = db.collection(`users`);
  collection.find({}).toArray(function (err, result) {
    if (err) throw err;
    console.log(result);
    call(result);
  });
};

async function sortDocuments(db, call) {
  const collection = db.collection(`users`);
  const mysort = { name: 1 };
  collection.find().sort(mysort).toArray(function (err, result) {
    if (err) throw err;
    console.log(`sort ascending was completed`);
    console.log(result);
    call(result);
  });
};

async function deleteDocument(db) {
  const collection = db.collection(`users`);
  const myquery = { address: `Mountain 21` };
  collection.deleteOne(myquery, function (err) {
    if (err) throw err;
    const myQueryJSON = JSON.stringify(myquery);
    console.log(`1 document deleted ${myQueryJSON}`);
  });
};

async function deleteManyDocuments(db) {
  const collection = db.collection(`users`);
  const myquery = { address: /^O/ };
  collection.deleteMany(myquery, function (err, obj) {
    if (err) throw err;
    const myQueryJSON = JSON.stringify(myquery);
    console.log(`${obj.result.n} documents deleted ${myQueryJSON}`);
  });
};

async function dropCollection(db) {
  const collection = db.collection(`users`);
  collection.drop(function (err, delOK) {
    if (err) throw err;
    if (delOK) console.log(`Collection deleted`);
  });
};

async function updateOneDocument(db) {
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
// join collections, sort by name order and write to Google Sheets
async function joinCollections(db) {
  const collection = db.collection(`users`);
  const mysort = { name: 1 };
  collection.aggregate([
    {
      $lookup:
      {
        from: `cars`,
        localField: `user_id`,
        foreignField: `user_id`,
        as: `cardetails`
      }
    },
    { $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: [`$cardetails`, 0] }, `$$ROOT`] } } },
    { $project: { cardetails: 0 } }
  ]).sort(mysort).toArray(function (err, res) {
    if (err) throw err;
    getData(res);
  });
};

async function getBody(res) {
  let arrayBody = [];
  res.forEach(element => {
    let lastArray = [];
    for (let key in element) {
      lastArray.push(element[key]);
    }
    arrayBody.push(lastArray);
  });
  return arrayBody;
}

async function getTitle(res) {
  let arrayTitle = [];
  for (let key in res[0]) {
    arrayTitle.push(key);
  }
  return arrayTitle;
}

async function getData(res) {
  const body = await getBody(res);
  const title = await getTitle(res);
  body.unshift(title);
  sheets.writeToSheets(`A1:H`, body);
  return body;
}

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
  joinCollections,
  getData
};
