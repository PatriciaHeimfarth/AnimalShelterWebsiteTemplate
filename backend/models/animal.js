const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({

  Species: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  }

  //TODO: Image
})
module.exports = mongoose.model('Animal', animalSchema)