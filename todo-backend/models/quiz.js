const mongoose = require("mongoose") // requiring the mongoose package

const phrasesSchema = new mongoose.Schema({ 
  question: {
    type: String
  },
  reply: {
    type: String
  },
  answers: [String],
  answerIndex: {
    type: Number
  },
});

const quizSchema = new mongoose.Schema({
  phrases: [phrasesSchema],
})

const quizesSchema = new mongoose.Schema({
  topic: {
    type: String, // task is a string
    unique: true, // it has to be unique
    required: true, // it is required
  },
  dialogues: [quizSchema]
})

const SimpleQuizModel = mongoose.model("SimpleQuiz", quizesSchema) // creating the model from the schema

module.exports = {SimpleQuizModel} // exporting the model