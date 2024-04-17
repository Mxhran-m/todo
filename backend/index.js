// write a basic express boilerplate code
// with express.json middleware

console.log("I am running!");
const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

// body{
//     title: String;
//     description: string;
// }
app.post("/todo", async function (req, res) {
  const createPayload = req.body;
  const parsedPayload = createTodo.safeParse(createPayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "You sent the wrong inputs",
    });
    return;
  }
  // put it in mongodb
  await todo.create({
    title: createPayload.title,
    description: createPayload.description,
    completed: false,
  });

  res.json({
    msg: "Todo has been Created",
  });
});

app.get("/todos", async function (req, res) {
  const todos = await todo.find();
  console.log(todos);
  //   const todos = [
  //     {
  //       title: "One",
  //       description: "Decsription for the One ",
  //     },
  //     {
  //       title: "Two",
  //       description: "Decsription for the Two ",
  //     },
  //     {
  //       title: "Three",
  //       description: "Decsription for the Three ",
  //     },
  //   ];
  res.json({
    todos,
  });
});

app.put("/completed", async function (req, res) {
  const updatePayload = req.body;
  const parsedPayload = updateTodo.safeParse(updatePayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "You sent the wrong inputs",
    });
    return;
  }
  await todo.update(
    {
      _id: req.body.id,
    },
    {
      completed: true,
    }
  );

  res.json({
    msg: " Todo marked as completed",
  });
});

app.listen(3000);
