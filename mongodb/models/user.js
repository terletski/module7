const mongoose = require(`mongoose`);

const userSchema = mongoose.Schema({
  id: Number,
  name: String,
  age: Number,
  address: String
});

const User = mongoose.model(`User`, userSchema);

module.exports = User;
