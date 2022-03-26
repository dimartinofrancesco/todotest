const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const { json } = require("body-parser");
const { nanoid } = require("nanoid");

dotenv.config({ path: "./config.env" });

const app = express();

app.use(cors());
app.use(json());

let todos = [
  {
    id: nanoid(),
    title: "Test for latest changes on homepage",
    completed: false,
    priority: true,
  },
  {
    id: nanoid(),
    title: "New design system: brainstorming",
    completed: false,
    priority: true,
  },
  {
    id: nanoid(),
    title: "Fix code on landing page",
    completed: false,
    priority: true,
  },
  {
    id: nanoid(),
    title: "Replace broken CEO",
    completed: false,
    priority: true,
  },
  {
    id: nanoid(),
    title: "Adjust gradients in home illustration",
    completed: false,
    priority: false,
  },
  {
    id: nanoid(),
    title: "Send adv",
    completed: false,
    priority: false,
  },
  {
    id: nanoid(),
    title: "A/B test App 2.0",
    completed: true,
    priority: true,
  },
  {
    id: nanoid(),
    title: "Code animation for homepage hero",
    completed: true,
    priority: false,
  },
  {
    id: nanoid(),
    title: "Test for latest changes on homepage",
    completed: true,
    priority: false,
  },
  {
    id: nanoid(),
    title: "Contact stakeholder for shared library",
    completed: true,
    priority: false,
  },
  {
    id: nanoid(),
    title: "Abbiamo in serbo qualcosa per te. Presto anche in italiano",
    completed: true,
    priority: false,
  },
];

app.get("/todos", (req, res) => res.send(todos));

app.post("/todos", (req, res) => {
  const todo = {
    title: req.body.title,
    id: nanoid(),
    completed: false,
    priority: req.body.priority,
  };
  todos.push(todo);
  return res.send(todo);
});

app.patch("/todos/:id", (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => todo.id == id);
  const completed = Boolean(req.body.completed);
  if (index > -1) {
    todos[index].completed = completed;
  }
  return res.send(todos[index]);
});

app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => todo.id == id);
  if (index > -1) {
    todos.splice(index, 1);
  }

  res.send(todos);
});

const PORT = 7000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.green.bold));
