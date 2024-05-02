const mongoose = require("mongoose") // requiring the mongoose package

const topicSchema = new mongoose.Schema({
  // creating a schema for todo
  id: {
    type: String, // task is a string
    unique: true, // it has to be unique
    required: true, // it is required
  },
  topic: {
    type: String, // task is a string
    unique: true, // it has to be unique
    required: true, // it is required
  },
  text: {
    type: String, // task is a string
  }
})

const topicModel = mongoose.model("topic", topicSchema) // creating the model from the schema

module.exports = topicModel // exporting the model