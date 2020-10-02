const mongoose = require("mongoose");
const colors = require("colors");

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose.connect(process.env.MONGO_URL, options, (err) =>
  err
    ? console.log("db is not conneted Please try again".red)
    : console.log("db is now connected so proceed your routes".green)
);

module.exports = mongoose;
