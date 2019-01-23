const yargs = require(`yargs`);
const createObject = require(`./mongoDBMethods`).createObject;
const model = require(`./models/models`);
const connect = require(`./mongodbConnection`);

// eslint-disable-next-line no-unused-expressions
yargs.command(`save`, `save data in user's collection`, {}, (argv) => {
  let collection = createObject(argv);
  let userModel = model.createModel(argv.collection, collection);
  connect.saveModel(userModel);
})
  .command(`get`, `get data from user's collection`, {}, async (argv) => {
    let users = model.getCollection(argv.collection);
    let array = await connect.findObjectBy(users, argv.property, argv.value);
    console.log(array);
  })
  .help()
  .argv;
