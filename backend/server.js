const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app.js');
const { bgGreen } = require('colors');

const DB_LOCAL = process.env.DATABASE_LOCAL;
console.log(`${DB_LOCAL}`.bgGreen.white);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DB_LOCAL, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Database connected on: ${conn.connection.host}`.yellow.bgBlue);
  } catch (error) {
    console.log(`${error.message} ❌❌❌`.red);
    process.exit(1);
  }
};

connectDB();

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`.cyan);
});