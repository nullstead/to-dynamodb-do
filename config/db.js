// config/db.js

const AWS = require('aws-sdk');
require('dotenv').config();

// Configure AWS
AWS.config.update({
  region: process.env.AWS_REGION || 'eu-west-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'TodoItems';

// Create table if it doesn't exist
const createTable = async () => {
  const dynamodb = new AWS.DynamoDB();
  
  const params = {
    TableName: TABLE_NAME,
    KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
    AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    }
  };

  try {
    await dynamodb.createTable(params).promise();
    console.log(`Created table: ${TABLE_NAME}`);
  } catch (error) {
    if (error.code === 'ResourceInUseException') {
      console.log(`Table already exists: ${TABLE_NAME}`);
    } else {
      console.error('Error creating table:', error);
    }
  }
};

module.exports = {
  dynamoClient,
  TABLE_NAME,
  createTable
};