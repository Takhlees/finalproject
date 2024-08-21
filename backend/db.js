const mongoURI = "mongodb+srv://takhleesfatima2003:324%40simba@cluster0byt.m1ymuoz.mongodb.net/Hotel?authMechanism=DEFAULT"
const mongoose = require('mongoose');

const connectToMongo = async () => {
   try {
       await mongoose.connect(mongoURI);
       console.log('Connected to MongoDB successfully');
   } catch (err) {
       console.error('Failed to connect to MongoDB:', err);
   }
};

module.exports = connectToMongo;