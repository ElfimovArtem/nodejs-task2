const Joi = require('@hapi/joi');

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

const queryParamSchema = Joi.object({
  query: Joi.string().required()
});

const errorDispatcher = (response) => {
  return response
    .status(HttpStatus.NOT_FOUND)
    .send({
      error: HttpStatus.getStatusText(HttpStatus.NOT_FOUND)
    });
}

const appStart = (req, res) => {
  res.status(HttpStatus.OK).send(statuses.SUCCESS);
}

router.get('/users/:id',validator.body(bodyQuerySchema), (request, response) => {
  const user = collection.getUserById(request);
  (!user) ? errorDispatcher(response) : response.status(HttpStatus.OK).send({ data: user });
});


router.get('/users', validator.query(queryParamSchema), (req, res) => {
  const query = req.query.query;
  const limit = req.query.limit || 10;
  (!query) ? errorDispatcher(res) : res.send(collection.searchUser(query, limit));
});


router.post('/user',validator.body(bodyQuerySchema),(req, res) => {
  collection.createUser(req);
  res.status(HttpStatus.OK).send(statuses.CREATE);
});

router.get('/search/:id',  (req, res)=> {
  const user = collection.searchById(req.params.id);
  (!user) ? errorDispatcher(res): res.status(HttpStatus.OK).send({ data: user });
})

router.delete('/delete/:id',(req, res)=> {
  collection.deleteById(req.params.id);
  res.status(HttpStatus.OK).send(statuses.DELETE);
});

router.put('/user/:id', validator.body(bodyQuerySchema),(req, res)=> {
  const user =  collection.updateUser(req);
  (!user) ? errorDispatcher(res) : res.status(HttpStatus.OK).send(statuses.UPDATE);
});

router.get('/', appStart);

app.use('/home', router);
app.listen(port);