const  mongoose = require('mongoose'); 

const connectDB = async () =>{
  try {
    const conn = await mongoose.connect(String(process.env.MONGO_URI),{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true});
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = connectDB;