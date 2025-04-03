// models/Todo.js

const { dynamoClient, TABLE_NAME } = require('../config/db');
const { v4: uuidv4 } = require('uuid');

class Todo {
  // Get all todos
  static async getAll() {
    const params = {
      TableName: TABLE_NAME
    };
    
    try {
      const { Items } = await dynamoClient.scan(params).promise();
      return Items;
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  }

  // Get todo by id
  static async getById(id) {
    const params = {
      TableName: TABLE_NAME,
      Key: { id }
    };
    
    try {
      const { Item } = await dynamoClient.get(params).promise();
      return Item;
    } catch (error) {
      console.error(`Error fetching todo ${id}:`, error);
      throw error;
    }
  }

  // Create new todo
  static async create(todoData) {
    const todo = {
      id: uuidv4(),
      title: todoData.title,
      description: todoData.description || '',
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const params = {
      TableName: TABLE_NAME,
      Item: todo
    };
    
    try {
      await dynamoClient.put(params).promise();
      return todo;
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    }
  }

  // Update todo
  static async update(id, todoData) {
    const params = {
      TableName: TABLE_NAME,
      Key: { id },
      UpdateExpression: 'set title = :title, description = :description, completed = :completed, updatedAt = :updatedAt',
      ExpressionAttributeValues: {
        ':title': todoData.title,
        ':description': todoData.description || '',
        ':completed': todoData.completed === 'true' || todoData.completed === true,
        ':updatedAt': new Date().toISOString()
      },
      ReturnValues: 'ALL_NEW'
    };
    
    try {
      const { Attributes } = await dynamoClient.update(params).promise();
      return Attributes;
    } catch (error) {
      console.error(`Error updating todo ${id}:`, error);
      throw error;
    }
  }

  // Toggle completion status
  static async toggleCompleted(id) {
    // First get the current item
    const todo = await this.getById(id);
    
    if (!todo) {
      throw new Error('Todo not found');
    }
    
    const params = {
      TableName: TABLE_NAME,
      Key: { id },
      UpdateExpression: 'set completed = :completed, updatedAt = :updatedAt',
      ExpressionAttributeValues: {
        ':completed': !todo.completed,
        ':updatedAt': new Date().toISOString()
      },
      ReturnValues: 'ALL_NEW'
    };
    
    try {
      const { Attributes } = await dynamoClient.update(params).promise();
      return Attributes;
    } catch (error) {
      console.error(`Error toggling todo ${id}:`, error);
      throw error;
    }
  }

  // Delete todo
  static async delete(id) {
    const params = {
      TableName: TABLE_NAME,
      Key: { id }
    };
    
    try {
      return await dynamoClient.delete(params).promise();
    } catch (error) {
      console.error(`Error deleting todo ${id}:`, error);
      throw error;
    }
  }
}

module.exports = Todo;