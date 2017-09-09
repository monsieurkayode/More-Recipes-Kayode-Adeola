const testValidUsers = [
  {
    username: 'patsiizy',
    password: 'passover',
    confirmPassword: 'passover',
    email: 'patzii@gmail.com',
  },

  {
    username: 'sponge',
    password: 'squarepants',
    confirmPassword: 'squarepants',
    email: 'spongebob@gmail.com',
  },

];

const validUsersLogin = [
  {
    username: 'patsiizy',
    password: 'passover',
  },

  {
    username: 'sponge',
    password: 'squarepants',
  },
];

const invalidUsers = [
  {
    username: 'rapait',
    password: 'gutikms',
  },

  {
    username: 'sumbaz',
    password: 'rakers',
  },
];


const emptyUsername = [
  {
    username: '',
    password: 'password',
    email: 'sam@gmail.com'
  }
];

const emptyPassword = [
  {
    username: 'samtarly',
    password: '',
    email: 'sam@gmail.com'
  }
];

const emptyEmail = [
  {
    username: 'samtarly',
    password: 'password',
    email: '',
  }
];

const incorrectPassword = [
  {
    username: 'sponge',
    password: 'incorrect'
  }
];

const nullForm = [
  {
    username: 'sponge'
  }
];

export default {
  validUsersLogin,
  invalidUsers,
  testValidUsers,
  emptyUsername,
  emptyPassword,
  emptyEmail,
  incorrectPassword,
  nullForm
};
