'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// assuming mongoose@6.x
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

// const mongoServer = await MongoMemoryServer.create();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectDb = async () => {
  const mongoServer = await MongoMemoryServer.create();
  const dbUri = mongoServer.getUri();
  await mongoose.connect(dbUri, { dbName: 'boo-test-db' });
};

const disconnectDb = async () => {
  await mongoose.disconnect();
};

(async () => {
  await connectDb();
})();

// set the view engine to ejs
app.set('view engine', 'ejs');

// routes
app.use('/', require('./routes/profile')());

// start server
const server = app.listen(port);
console.log('Express started. Listening on %s', port);

module.exports = server;
