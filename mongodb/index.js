const mongoose = require(`mongoose`);
const User = require(`./models/user`);
const users = require(`./models/users.json`);
const yargs = require(`yargs`).argv;
mongoose.Promise = require(`bluebird`);

mongoose.connect(`mongodb://localhost/testmongoose`);

const db = mongoose.connection;

db.on(`error`, err => {
  console.log(`error connection`, err);
});
console.log(users);
db.once(`open`, () => {
  console.log(`Successful connection`);
  const user = new User(users);
  console.log('user', user);
  user.save((err, createdUser) => {
    console.log('result', err, createdUser);
  });
});
