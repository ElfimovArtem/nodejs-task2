const uuid = require('uuid/v1');

const db = {
  1: {
    login: 'test',
    password: 'test',
    age: 10,
    id: 1,
    isDeleted: false
  },
  2: {
    login: 'test2',
    password: 'test2',
    age: 20,
    id: 2,
    isDeleted: true
  }
};

const getUserById= (req) => db[req.params.id];

const createUser = (newUser) => {
  const id = uuid();

  db[id] = {
    id,
    ...newUser,
    isDeleted: false
  };

  return db[id];

}

const searchById = (id) => db[id];

const deleteById = (id) => {
  const item = searchById(id);
  item.isDeleted = true;
}

const updateUser = (req) => {
  const item = searchById(req.body.id);
  return Object.assign(item,req.body);
}


const searchUser = (login,limit) => {
  let requestedUsers = db.filter(user => user.login.indexOf(login) !== -1);
  return requestedUsers.length <= limit ? requestedUsers : requestedUsers.slice(0,limit);
}

module.exports = { getUserById, createUser, searchById, deleteById, updateUser, searchUser};