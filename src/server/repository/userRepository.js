const users = [
  {
    id: '101532300827026',
    username: undefined,
    displayName: 'Christopher Albiajgfhbgeh Shepardberg',
    name:
        {
          familyName: undefined,
          givenName: undefined,
          middleName: undefined,
        },
    gender: undefined,
    profileUrl: undefined,
    provider: 'facebook',
    _raw:
        '{"name":"Christopher Albiajgfhbgeh Shepardberg","id":"101532300827026"}',
    _json:
        {
          name: 'Christopher Albiajgfhbgeh Shepardberg',
          id: '101532300827026',
        },
  },
];

async function findById(id) {
  let filteredUsers = users.filter(user => !!user ? user.id === id : false);
  return filteredUsers.length > 0 ? filteredUsers[0] : null;
}

async function save(user) {
  users.push(user);
  let savedUser = await findById(user.id);
  return savedUser;
}

module.exports = {
  findById: findById,
  save: save,
};