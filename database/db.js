const  mongoose = require('mongoose'); 
// const dotenv = require('dotenv');
// dotenv.config({ path: "../config.env" });
const config = require('config');

//DB config
const uri = config.get('mongoURI');

const connectDB = async () =>{
  try {
    const conn = await mongoose.connect(uri,{
      useNewUrlParser: true,
      useUnifiedTopology: true});
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = connectDB;