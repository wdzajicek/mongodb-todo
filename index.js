// IMPORTS
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import TodoTask from './models/TodoTask.js';

// GLOBAL VARIABLES
const app = express();

// Load `.env` file into `process.env` to use as database connection config
dotenv.config();

// Access form submissions
app.use(express.urlencoded({ extended: true }));

// Configure dir for static files
app.use('/static', express.static('public'));

// Connect to the database
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => {
    console.log("Connected to db!");
    app.listen(
      3000,
      () => console.log('Server listening on port 3000')
    );
  })

// Configure view engine to use ejs
app.set('view engine', 'ejs');

// GET METHOD - render existing items from DB as todo items
app.get('/', (req, res) => {
  TodoTask
    .find({})
    .then((tasks) => {
      res.render("todo.ejs", { todoTasks: tasks });
  })
});

// POST METHOD - add new item to DB and reload which triggers a rerender
app.post('/', async (req, res) => {
  const todoTask = new TodoTask({
    content: req.body.content
  });

  try {
    await todoTask.save();
    res.redirect("/");
  } catch (err) {
    res.redirect("/");
  }
});

// UPDATE - edit an existing item
app
  .route("/edit/:id")
  .get((req, res) => {
    const id = req.params.id;

    TodoTask
      .find({})
      .then((tasks) => {
        res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
      })
  })
  .post((req, res) => {
    const id = req.params.id;

    TodoTask
      .findByIdAndUpdate(id, { content: req.body.content })
      .then(() => res.redirect("/"))
      .catch(err => res.send(500, err))
  });

// DELETE - delete an existing item in the DB and the reload which rerenders
app
  .route("/remove/:id")
  .get((req, res) => {
    const id = req.params.id;

    TodoTask
      .findByIdAndRemove(id)
      .then(() => res.redirect("/"))
      .catch(err => res.send(500, err))
  });
