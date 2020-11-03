const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect(
    process.env.MONGO_URI,
    {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: true,
    },
    () => console.log('connected to DB')
  );
  try {
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = connectDB;
