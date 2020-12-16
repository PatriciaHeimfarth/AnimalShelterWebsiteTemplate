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
      type: String
  }

  //TODO: Needs help attribute; description
})
module.exports = mongoose.model('Animal', animalSchema)