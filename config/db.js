const  mongoose = require('mongoose'); 

const connectDB = async () =>{
  try {
    const conn = await mongoose.connect("mongodb+srv://tanu:tanu@shoppinglist.kvnb6ek.mongodb.net/?retryWrites=true&w=majority",{
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