const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const PORT = process.env.PORT || 3000
const db = require("./models/")

const cors = require("cors")
app.use(cors())

app.use(bodyParser.json())

function success(res, payload) {
  console.log(payload)
  return res.status(200).json(payload)
}

app.get("/theory/:id", async (req, res, next) => {
  try {
    const theory = await db.theorySimple.SimpleModel.find({topicId: req.params.id})
    return success(res, theory)
  } catch (err) {
    next({ status: 400, message: "failed to get todos" })
  }
})

app.get("/topics", async (req, res, next) => {
  try {
    const topic = await db.topic.find({})
    return success(res, topic)
  } catch (err) {
    next({ status: 400, message: "failed to get todos" })
  }
})

app.get("/quiz/:id", async (req, res, next) => {
  try {
    const quiz = await db.quiz.SimpleQuizModel.find({topic: req.params.id})
    return success(res, quiz)
  } catch (err) {
    next({ status: 400, message: "failed to get quiz" })
  }
})

app.use(express.static('images'));

app.use((err, req, res, next) => {
  return res.status(err.status || 400).json({
    status: err.status || 400,
    message: err.message || "there was an error processing request",
  })
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})