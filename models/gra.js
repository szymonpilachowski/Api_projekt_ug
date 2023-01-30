const mongoose = require('mongoose')

const graSchema = new mongoose.Schema({
  nazwa: {
    type: String,
    required: true
  },
  gatunek: {
    type: String,
    required: true
  },
  dataPobrania: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('Gra', graSchema)