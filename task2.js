import * as Joi from '@hapi/joi';

const express = require('express');
const collection = require('./db');
const bodyQuerySchema = require('./validations');
const bodyParser = require('body-parser');
const HttpStatus = require('http-status-codes');
const validator = require('express-joi-validation').createValidator({});

const statuses = {
  SUCCESS : 'Success',
  DELETE: 'Deleted',
  CREATE: 'Created',
  UPDATE: 'Updated'
};

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

const port = process.env.PORT || 5000;
const router = express.Router();