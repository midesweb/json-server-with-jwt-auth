const delay = require('delay');

module.exports = function (req, res) {
  delay(1000).then(() => {
    //si estoy aqui ya paso por el midddleware, luego no tengo que verificar nada
    res.status(201).json('Verified');
  });
}
