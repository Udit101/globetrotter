const mongoose = require('mongoose');
const fs = require('fs');
const Destination = require('./models/Destination');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB for data import');

  // Read data from JSON file
  const rawData = fs.readFileSync('./data/destinations.json', 'utf8');
  const destinations = JSON.parse(rawData);

  // Save the destinations to MongoDB
  Destination.insertMany(destinations)
    .then(() => {
      console.log('Data import successful');
      mongoose.connection.close();
    })
    .catch(err => {
      console.error('Error importing data:', err);
      mongoose.connection.close();
    });
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});