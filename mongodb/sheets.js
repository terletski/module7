const { authorize, google } = require(`./config`);
const fs = require(`fs`);
const spreadsheetId = `1mok1ObFRhS8jqP9KQ_MdHvpyFQr7ehsen_KWd8dtHIA`;

/**
 * Sheet Url:
 * @see https://docs.google.com/spreadsheets/d/1mok1ObFRhS8jqP9KQ_MdHvpyFQr7ehsen_KWd8dtHIA/edit#gid=0
 */
const writeToSheets = (range, values) => {
  fs.readFile(`./authData/client_secret.json`, (err, content) => {
    if (err) return console.log(`Error loading client secret file:`, err);
    // Authorize a client with credentials, then call the Google Sheets API.
    authorize(JSON.parse(content), (auth) => {
      const sheets = google.sheets({ version: `v4`, auth });
      const valueInputOption = `USER_ENTERED`;
      const resource = { values };
      sheets.spreadsheets.values.append({
        spreadsheetId, range, valueInputOption, resource
      }, err => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Success!`);
        }
      });
    });
  });
};

const readFromSheets = () => {
  fs.readFile(`./authData/client_secret.json`, (err, content) => {
    if (err) return console.log(`Error loading client secret file:`, err);
    // Authorize a client with credentials, then call the Google Sheets API.
    authorize(JSON.parse(content), (auth) => {
      const sheets = google.sheets({ version: 'v4', auth });
      sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'A1:H',
      }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const rows = res.data.values;
        if (rows.length) {
          return rows;
        } else {
          console.log('No data found.');
        }
      });
    });
  });
}

module.exports = {
  writeToSheets,
  readFromSheets
};
