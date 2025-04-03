// controllers/todoController.js

const Todo = require('../models/Todo');

exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.getAll();
    res.render('index', { 
      title: 'Todo List',
      todos 
    });
  } catch (error) {
    res.status(500).render('index', { 
      title: 'Error',
      todos: [],
      error: 'Failed to fetch todos'
    });
  }
};

exports.getCreateForm = (req, res) => {
  res.render('create', { title: 'Create Todo' });
};

exports.createTodo = async (req, res) => {
  try {
    await Todo.create(req.body);
    res.redirect('/');
  } catch (error) {
    res.status(500).render('create', { 
      title: 'Create Todo',
      error: 'Failed to create todo'
    });
  }
};

exports.getEditForm = async (req, res) => {
  try {
    const todo = await Todo.getById(req.params.id);
    if (todo) {
      res.render('edit', { 
        title: 'Edit Todo',
        todo 
      });
    } else {
      res.status(404).redirect('/');
    }
  } catch (error) {
    res.status(500).render('index', { 
      title: 'Error',
      error: 'Failed to fetch todo'
    });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    await Todo.update(req.params.id, req.body);
    res.redirect('/');
  } catch (error) {
    res.status(500).render('edit', { 
      title: 'Edit Todo',
      todo: req.body,
      error: 'Failed to update todo'
    });
  }
};

exports.toggleTodo = async (req, res) => {
  try {
    await Todo.toggleCompleted(req.params.id);
    res.redirect('/');
  } catch (error) {
    res.status(500).redirect('/');
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    await Todo.delete(req.params.id);
    res.redirect('/');
  } catch (error) {
    res.status(500).redirect('/');
  }
};
