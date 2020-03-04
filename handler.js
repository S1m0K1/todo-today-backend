'use strict';

const serverless = require('serverless-http');
const express = require('express');
const app = express();
app.use(express.json());
const uuidv4 = require('uuid/v4');
const mysql = require('mysql');
const cors = require('cors');
app.use(cors());

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA
});

// Retrieving tasks
app.get('/tasks', function (req, res) {

  connection.query('SELECT * FROM `task` WHERE `userId` = 1', function (error, results, fields) {
    // Error will be an error if one occurred during the query
    if (error) {
      console.error("Your query had a problem fetching tasks", error);
      res.status(500).json({ errorMessage: error });
    }
    else {
      // Query was successful
      res.json({
        tasks: results
      });
    }
  });
});

// Creating tasks
app.post('/tasks', function (req, res) {

  // Accept information from the client about what task is being created
  const taskToInsert = req.body;
  taskToInsert.taskId = uuidv4();

  // Take that information and pre-populate an SQL INSERT statement
  // Execute SQL statement to POST
  connection.query('INSERT INTO `task` SET ?', taskToInsert, function (error, results, fields) {
    if (error) {
      console.error("Your query had a problem with inserting a new task", error);
      res.status(500).json({ errorMessage: error });
    }
    else {
      // Return to the client information about the task that has been created
      res.json({
        task: taskToInsert,
        message: 'A brand new to-do!'
      });
    }
  });
});

// Updating tasks
app.put('/tasks/:taskId', function (req, res) {

  // Accept information from the client about what task is being updated, i.e. marked as completed
  const taskToEdit = req.params.taskId;

  // Execute SQL statement to UPDATE
  connection.query('UPDATE `task` SET `completed` = 1 WHERE `taskId` = ?', taskToEdit, function (error, results, fields) {
    if (error) {
      console.error("Your query had a problem updating the task", error);
      res.status(500).json({ errorMessage: error });
    }
    else {
      // Return to the client information about the task that has been updated, i.e. marked as completed
      res.json({
        updatedTask: results,
        message: 'Another to-do done!'
      });
    }
  });
});

// Deleting tasks
app.delete('/tasks/:taskId', function (req, res) {

// Identify task being deleted
  const taskToDelete = req.params.taskId;
  
// Execute SQL statement to DELETE
  connection.query('DELETE FROM `task` WHERE `taskId` = ?'), taskToDelete, function (error, results, fields) {
    if (error) {
      console.error("Your query had a problem deleting the task", error);
      res.status(500).json({ errorMessage: error });
    }
    else {
//       // Return to the client information about task that has been deleted
      res.json({
        deletedTask: results,
        // taskToDelete: taskToDelete,
        message: 'Your task has been deleted.'
      });
    }
  };
});

module.exports.tasks = serverless(app);