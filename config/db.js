const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://Ganesh37:Ganesh%402013@cluster0.stqph.mongodb.net/?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`MongoDB server issue: ${error}`);
    process.exit(1); // Exit process with failure
  }
}

module.exports = connectDB;
