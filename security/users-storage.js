class UserStorage {

  constructor() {
    this.users = [];
  }

  registerUser(user) {
    if(user && user.email && user.password) {
      if(! this.chekEmailInUse(user.email)) {
        this.users.push(user);
        return true;
      }
    }
    return false;
  } 

  chekEmailInUse(email) {
    for(let i = 0; i < this.users.length; i++) {
      if(this.users[i].email === email) {
        return true;
      }
    }
    return false;
  }

  userExists(user) {
    for(let i = 0; i < this.users.length; i++) {
      if(user.email === this.users[i].email && user.password === this.users[i].password) {
        return true;
      }
    }
    return false;
  }

  logUsers() {
    console.log(`
User store in memory.
Current users in store:`);
    for(let i = 0; i < this.users.length; i++) {
      console.log(this.users[i]);
    }
  }
} 

module.exports = (user) => {
  userStorage = new UserStorage();
  userStorage.registerUser(user);
  return userStorage;
}
 
