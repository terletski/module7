const mongoose = require(`mongoose`);

const userSchema = mongoose.Schema({
  model: String,
  power: Number,
  color: String
});

const Car = mongoose.model(`Car`, userSchema);

module.exports = Car;
