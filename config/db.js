const  mongoose = require('mongoose'); 
const dotenv = require('dotenv');
dotenv.config({ path: "../config.env" });
const connectDB = async () =>{
  try {
    console.log(`MONGO_URI "${process.env.MONGO_URI}"`);
    const conn = await mongoose.connect(`"${process.env.MONGO_URI}"`,{
      useNewUrlParser: true,
      useUnifiedTopology: true});
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = connectDB;