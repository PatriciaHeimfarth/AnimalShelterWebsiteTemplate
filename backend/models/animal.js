const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({

  Species: {
    type: String,
    required: true,
  },

  Name: {
    type: String,
    required: true,
  },

  Image: {
    type: String,   
  },

  Description: {
    type: String, 
  },

  Birthdate: {
    type: Date, 
  },

  IsEmergencyCase: {
    type: Boolean,   
  },

})
module.exports = mongoose.model('Animal', animalSchema)