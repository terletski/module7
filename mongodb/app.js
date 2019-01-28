const sheets = require(`./sheets.js`);
const json = require(`./DB.json`);

function getTable () {
  let array = [];
  json.forEach(element => {
    let lastArray = [];
    for (let key in element) {
      lastArray.push(element[key]);
    }
    array.push(lastArray);
  });
  console.log(array);
  return array;
}

sheets.writeToSheets(`A2:H`, getTable());
