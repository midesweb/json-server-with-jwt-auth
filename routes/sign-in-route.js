const jwt = require('../security/jwt');
const delay = require('delay');

module.exports = (userStorage) => {
  return function (req, res) {
    let user = req.body;
    delay(1000).then(() => {
      if(userStorage.registerUser(user)) {
        console.log('User signed in');
        res.status(201).json('User signed in successfully');
      } else {
        console.log('User not signed in');
        res.status(401).send('User not signed in');
        res.send();
      }
    })
  }

}
