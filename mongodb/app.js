const sheets = require(`./sheets.js`);
const mongoDBMethods = require(`./mongoDBMethods.js`);

async function getBody() {
  let result = await mongoDBMethods.joinCollections();
  let arrayBody = [];
  result.forEach(element => {
    let lastArray = [];
    for (let key in element) {
      lastArray.push(element[key]);
    }
    arrayBody.push(lastArray);
  });
  console.log(arrayBody);
  return arrayBody;
}

async function getTitle() {
  let result = await mongoDBMethods.joinCollections();
  let arrayTitle = [];
  result.forEach(element => {
    let lastArray = [];
    for (let key in element[0]) {
      lastArray.push(key);
    }
  });
  console.log(arrayTitle);
  return arrayTitle;
}

async function getData() {
  const body = await getBody();
  const title = await getTitle();
  body.unshift(title);
  return body;
}

sheets.writeToSheets(`A1:H`, getData(db));


