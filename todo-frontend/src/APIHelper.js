
import axios from "axios"

const API_URL = "http://localhost:3000/"

async function getAll(path) {
  const { data: todos } = await axios.get(API_URL + path)
  return todos
}

async function getAllBe(path) {
  const { data: todos } = await axios.get(API_URL + path)
  const { data: todosBe } = await axios.get(API_URL + path + "Be")
  return {todos, todosBe}
}

export default { getAll, getAllBe}