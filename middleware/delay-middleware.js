const delay = require('delay');

module.exports = (miliseconds) => (req, res, next) => {
  delay(miliseconds).then( () => {
    next();
  });
}