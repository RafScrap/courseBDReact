const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/todo-app", {
  // connecting to the mongodb database name: "todo-app" locally
 // keeping the connection alive
})
mongoose.set("debug", true) // enabling debugging information to be printed to the console for debugging purposes
mongoose.Promise = Promise // setting mongoose's Promise to use Node's Promise

module.exports.theorySimple = require("./theorySimple") // requiring the todo model that we just created in mongodb
module.exports.topic = require("./topic") // requiring the todo model that we just created in mongodb
module.exports.quiz = require("./quiz") // requiring the todo model that we just created in mongodb