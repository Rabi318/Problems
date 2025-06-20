const { readData, writeData } = require("../models/todoModel");

const getAllTodos = (req, res) => {
  const data = readData();
  res.json(data.todos);
};

const addTodo = (req, res) => {
  const { title, completed } = req.body;
  if (!title || typeof completed !== "boolean") {
    return res.status(400).json({ message: "Invalid todo format" });
  }
  const data = readData();

  const newId =
    data.todos.length > 0 ? data.todos[data.todos.length - 1].id + 1 : 1;

  const newTodo = { id: newId, title, completed };
  data.todos.push(newTodo);
  writeData(data);
  res.status(201).json({ message: "Todo added successfully", todo: newTodo });
};

const updateTodo = (req, res) => {
  const id = Number(req.params.id);
  const { title, completed } = req.body;
  const data = readData();
  const index = data.todos.findIndex((todo) => todo.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }
  if (completed !== undefined) data.todos[index].completed = completed;
  if (title) data.todos[index].title = title;
  writeData(data);
  res.json({ message: "Todo updated", todo: data.todos[index] });
};

const deleteTodo = (req, res) => {
  const id = Number(req.params.id);
  const data = readData();
  const index = data.todos.findIndex((todo) => todo.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }
  const removed = data.todos.splice(index, 1);
  writeData(data);
  res.json({ message: "Todo deleted", todo: removed[0] });
};

const searchTodos = (req, res) => {
  const query = req.query.q?.toLowerCase();
  if (!query) return res.status(400).json({ msg: "Query is required" });
  const data = readData();
  const results = data.todos.filter((todo) =>
    todo.title.toLowerCase().includes(query)
  );

  if (results.length === 0) {
    return res.status(404).json({ msg: "No results found" });
  }

  res.json(results);
};

module.exports = {
  getAllTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  searchTodos,
};
