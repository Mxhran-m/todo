const mongoose = require("mongoose");
// mongo url
// mongodb+srv://mehran:Qc0vRrDusynFQBZK@todo.eme7uag.mongodb.net/
mongoose.connect(
  "mongodb+srv://mehran:Qc0vRrDusynFQBZK@todo.eme7uag.mongodb.net/todo"
);

const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const todo = mongoose.model("todos", todoSchema);

module.exports = {
  todo,
};
