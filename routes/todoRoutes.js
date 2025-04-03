// routes/todoRoutes.js

const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// GET - Show all todos
router.get('/', todoController.getAllTodos);

// GET - Show create form
router.get('/create', todoController.getCreateForm);

// POST - Create todo
router.post('/create', todoController.createTodo);

// GET - Show edit form
router.get('/edit/:id', todoController.getEditForm);

// PUT - Update todo
router.put('/edit/:id', todoController.updateTodo);

// PATCH - Toggle completed status
router.patch('/toggle/:id', todoController.toggleTodo);

// DELETE - Delete todo
router.delete('/delete/:id', todoController.deleteTodo);

module.exports = router;