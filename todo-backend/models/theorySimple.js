const mongoose = require("mongoose") // requiring the mongoose package

const examplesSchema = new mongoose.Schema({ 
  example: {
    type: String
  },
  note: {
    type: String
  },
  translation: {
    type: String
  },
});

const simpleSchema = new mongoose.Schema({
  header: {
    type: String
  },
  text: {
    type: String
  },
  examples: [examplesSchema],
  picture: {
    type: String
  }
})

const topicSchema = new mongoose.Schema({
  topicId: {
    type: String, // task is a string
    unique: true, // it has to be unique
    required: true, // it is required
  },
  picture: {
    type: String, // task is a string
  },
  theories: [simpleSchema]
})

const SimpleModel = mongoose.model("SimpleTheory", topicSchema) // creating the model from the schema

module.exports = {SimpleModel} // exporting the model