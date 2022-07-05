const  mongoose = require('mongoose'); 
const dotenv = require('dotenv');
dotenv.config({ path: "../config.env" });
const connectDB = async () =>{
  try {
    const URI = process.env.MONGO_URI;
    console.log(`MONGO_URI ${URI}`);
    const conn = await mongoose.connect("mongodb+srv://tanu:tanu@shoppinglist.kvnb6ek.mongodb.net/?retryWrites=true&w=majority",{
      useNewUrlParser: true,
      useUnifiedTopology: true});
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = connectDB;