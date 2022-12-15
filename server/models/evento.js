const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  imagen: String,
  lugar: String,
  fecha: String
});

module.exports = mongoose.model('Evento', eventoSchema);
