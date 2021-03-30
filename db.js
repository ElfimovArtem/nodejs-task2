const uuid = require('uuid/v1');
const db = [
  {
    login: 'test',
    password: 'test',
    age: 10,
    id: 1,
    isDeleted: false
  },
  {
    login: 'test2',
    password: 'test2',
    age: 20,
    id: 2,
    isDeleted: true
  }
];

const getUserById= (req) => db.filter((item) => item.id === req.params.id);

const createUser = (req) => {
  req.body['id'] = uuid();
  req.body['isDeleted'] = false;
  db.push(req.body);
}

const filterById = (id) => db.find((item) => item.id === id);

const searchById = (id) => filterById(id);

const deleteById = (id) => {
  const item = filterById(id);
  item.isDeleted = true;
}

const updateUser = (req) => {
  const item = filterById(req.body.id);
  return Object.assign(item,req.body);
}


const searchUser = (login,limit) => {
  let requestedUsers = db.filter(user => user.login.indexOf(login) !== -1);
  return requestedUsers.length <= limit ? requestedUsers : requestedUsers.slice(0,limit);
}

module.exports = { getUserById, createUser, searchById, deleteById, updateUser, searchUser};