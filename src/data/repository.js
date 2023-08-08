const USERS_KEY = "users";
const USER_KEY = "user";
const USEREMAIL_KEY = "email";
const USERPASSWORD_KEY = "password";

// Initialise local storage "users" with data, if the data is already set this function returns immediately.
function initUsers() {
  // Stop if data is already initialised.
  if(localStorage.getItem(USERS_KEY) !== null)
    return;

  // User data is hard-coded, passwords are in plain-text.
  const users = [
    {
      username: "mbolger",
      email: "mbolger@email.com",
      password: "abc123"
    },
    {
      username: "shekhar",
      email: "shekhar@email.com",
      password: "def456"
    }
  ];

  // Set data into local storage.
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getUsers() {
  // Extract user data from local storage.
  const data = localStorage.getItem(USERS_KEY);

  // Convert data to objects.
  return JSON.parse(data);
}

function addNewUser(newUsername, newEmail, newPassword) {
  const users = getUsers();
  users.push({
    username: newUsername,
    email: newEmail,
    password: newPassword
  });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// NOTE: In this example the login is also persistent as it is stored in local storage.
function verifyUser(email, password) {
  const users = getUsers();
  for(const user of users) {
    if(email === user.email && password === user.password)
    {
      setUser(user.username, user.email, user.password);
      return true;
    }
  }

  return false;
}

function setUser(username, email, password) {
  localStorage.setItem(USER_KEY, username);
  localStorage.setItem(USEREMAIL_KEY, email);
  localStorage.setItem(USERPASSWORD_KEY, password);
}

function getUser() {
  return localStorage.getItem(USER_KEY);
}

function getEmail() {
  return localStorage.getItem(USEREMAIL_KEY);
}

function getPassword() {
  return localStorage.getItem(USERPASSWORD_KEY);
}

function removeUser() {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(USEREMAIL_KEY);
  localStorage.removeItem(USERPASSWORD_KEY);
}

export {
  initUsers,
  verifyUser,
  addNewUser,
  getUser,
  getEmail,
  getPassword,
  removeUser
}
